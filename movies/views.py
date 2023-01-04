from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from .models import User, City, Theatre, Hall, Movie, Show, Ticket,Ticketlog
from datetime import datetime, timedelta
from django.utils.timezone import now, localtime
import random
import json
import csv
# Create your views here.
def export_to_csv(request):
    ticket=Ticket.objects.all()
    response=HttpResponse('text/csv')
    response['Content-Disposition']='attachment;filename=ticketslog.csv'
    writer=csv.writer(response)
    writer.writerow(['Ticket_No','User','Seat/s','Show','Theater','Cost'])
    ticket_fields=ticket.values_list('id','user_id','seat','show','show_id','cost')
    for tick in ticket_fields:
        
        writer.writerow(tick)
    # return response
    tickets = Ticket.objects.filter(user=request.user)
    print(ticket)


    # for game in games:
    #     scores = game.score_set.all().values_list('score',
    #                                             'date_played')
    #     writer.writerow(game)

    #     for score in scores:    
    #         writer.writerow(score)

    return response


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        # num = request.POST["phone_no"]
        user = authenticate(request,username=username,password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            messages.error(request, "Invalid username and/or password.")
            return redirect(reverse(login_view))
    else:
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse("index"))

        else:
            return render(request, "movies/login.html")

@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))



def layout(request):
    return render(request,"movies/layout.html")


def register(request):
    if request.method == "POST":
        firstname = request.POST["firstname"]
        lastname = request.POST["lastname"]
        email = request.POST["email"]
        phone_number = request.POST["phone_no"]

        city = request.POST["city"]
        city_obj = City.objects.get(name=city)

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            messages.error(request, "Passwords must match.")
            return redirect(reverse(register))
        else :
            if User.objects.filter(phone_no=phone_number).exists():
                messages.error(request, "Phone number already exists.")
                return redirect(reverse(register))
            elif User.objects.filter(email=email).exists():
                messages.error(request, "Email already exists.")
                return redirect(reverse(register))
            # elif User.objects.filter(username=firstname).exists():
            #     messages.error(request, "Username already exists.")
            #     return redirect(reverse(register)) 
            else :
                user = User.objects.create_user(email,email,password,city=city_obj,phone_no=phone_number)
                user.first_name = firstname
                user.last_name = lastname
                user.save()
        login(request, user)
        return HttpResponseRedirect(reverse("index"))

    else:
        return render(request, "movies/register.html", {"cities":City.objects.all()})

@login_required
def index(request):
    allMovies = list(Movie.objects.all())
    random_movies = random.sample(allMovies, 1)
    return render(request, "movies/index.html", {"random_movies": random_movies})

def paymentinfo(request):
    return render(request, "movies/paymentinfo.html")


def search(request):
    if request.method == 'POST':

        query = request.POST['q']

        for movie in Movie.objects.all():
            if query.lower() == movie.name.lower():

                return redirect(reverse(moviePage, kwargs={'movieName': movie.name}))
            
            else:
                continue

        return redirect(reverse(results, kwargs={'query': query}))


def results(request, query):

    results = []

    if query == 'all':
        allmovies = Movie.objects.all()
        return render(request, "movies/searchResults.html", {'movies': allmovies})

    else:

        for movie in Movie.objects.all():
            if query.lower() in movie.name.lower():
                results.append(movie)

        if len(results) == 0:
            messages.error(request, 'No such movie currently exists.')
            return redirect(reverse(error))

        else:
            return render(request, "movies/searchResults.html", {'movies': results})


def moviePage(request, movieName):
    return render(request, "movies/moviePage.html", {"movie": Movie.objects.get(name=movieName)})

def bookTicket(request, movieName):

    current_city = request.user.city
    
    today = datetime.today()
    currentDate = today.strftime('%d %B, %Y')

    current_time = localtime().time()

    dayList = []
    showsk = Show.objects.filter(movie__name=movieName).values_list('date', flat=True)
    
    for i in showsk:
        new_date = i
        dayList.append(new_date.strftime('%d %B, %Y'))

    current_movie = Movie.objects.get(name=movieName)
    theatres = Theatre.objects.filter(city=request.user.city)
    halls = Hall.objects.filter(theatre__id__in=theatres)
    shows = Show.objects.filter(movie=current_movie, hall__id__in=halls, date=today, time__gte=current_time)

    context={
        "current_city": current_city,
        "movie": Movie.objects.get(name=movieName),
        "cities": City.objects.exclude(name=request.user.city),
        "today": currentDate,
        "dayList": dayList,
        "shows": shows
    }

    return render(request, "movies/book_seat.html", context)

def error(request):
    return render(request, "movies/error.html")
    
def shows(request, movie, city, day, hall):

    now = datetime.now()
    current_time = now.strftime("%H:%M")

    if city=="any":
        theatres = Theatre.objects.all()
    else:
        cityName = City.objects.get(name=city)
        theatres = Theatre.objects.filter(city=cityName)

    if hall == "any":
        halls = Hall.objects.filter(theatre__id__in=theatres)
    else:
        halls = Hall.objects.filter(hall_type=hall, theatre__id__in=theatres)

    datetime_obj = datetime.strptime(day, "%d %B, %Y")
    date = datetime_obj.date()
    movie_obj = Movie.objects.get(name=movie)
    shows = Show.objects.filter(movie=movie_obj, hall__id__in=halls, date=date)
    return JsonResponse([show.serialize() for show in shows], safe=False)

def seats(request, show):

    current_show = Show.objects.get(pk=show)

    return JsonResponse(current_show.seats, safe=False)

@csrf_exempt
def ticket(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        current_show = Show.objects.get(pk=data.get("show"))

        row = ''
        col = ''
        total_seats = 0
        c_s = 0
        e_s = 0
        flag =1
        for seat in data.get("seatList"):
            row = seat[0]
            col = seat[1:]
            if current_show.seats[row][col] == 'Occupied':
                flag = 0
                break
            
        if flag==1:
            for seat in data.get("seatList"):
                row = seat[0]
                col = seat[1:]
                if current_show.seats[row][col] == 'Occupied':
                    flag = 0
                    break
                current_show.seats[row][col] = 'Occupied'
                current_show.save()
                total_seats+=1
                if row<='F':
                    c_s +=1
                else : e_s+=1
            cost = c_s*(current_show.rate-20) + e_s*(current_show.rate)
            Ticket.objects.create(user=request.user, seat={'seatList':data.get("seatList")}, show=current_show, cost=cost)
            Ticketlog.objects.create(
            username=request.user.first_name, 
            seat={'seatList':data.get("seatList")}, 
            show_name=current_show.movie.name,
            show_date=current_show.date,
            show_time=current_show.time,
            hall_name=current_show.hall.theatre.name,
            cost=cost)
            # teatre_name=current_show.hall.theatre.name,
            return JsonResponse({"message": "Ticket Created Successfully"}, status=201)
        return JsonResponse({"message": "Ticket Created Successfully"}, status=500)
        

def allTickets(request):

    current_time = localtime().time()

    print(current_time)

    ticketsList = Ticket.objects.filter(user=request.user).order_by('-id')

    context = {
        'Tickets': ticketsList,
        'current_time': current_time,
        }

    return render(request, "movies/tickets.html", context)

def allMovies(request):
    return render(request, "movies/allMovies.html")

