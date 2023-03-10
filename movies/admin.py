from django.contrib import admin
from .models import User, City, Theatre, Hall, Movie, Show, Ticket,Ticketlog
# Register your models here.
from import_export.admin import ImportExportModelAdmin
admin.site.register(User)
admin.site.register(City)
admin.site.register(Theatre)
admin.site.register(Hall)
admin.site.register(Movie)
admin.site.register(Show)
admin.site.register(Ticket)
# admin.site.register(Ticketlog)
@admin.register(Ticketlog)
class TicketlogAdmin(ImportExportModelAdmin):
    pass
