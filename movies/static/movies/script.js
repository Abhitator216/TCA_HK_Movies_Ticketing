document.addEventListener("DOMContentLoaded", () => {
  var movie = document.getElementById("movieName").innerHTML;
  var city = document.getElementById("cities").value;
  var day = document.getElementById("daySelect").value;
  var hall = document.getElementById("hallSelect").value;
  cost = 0;

  fetch(`/shows/${movie}/${city}/${day}/${hall}`)
    .then((response) => response.json())
    .then((shows) => {
      var i = 0;
      // const show.today = new Date();
      // console.log(show.today)

      shows.forEach(function (show) {
        if (show.date > show.today) {
          document.querySelectorAll(".book")[
            i
          ].href = `javascript:openModal(${show.id}, '${show.alpha_ran}',${show.rate}, ${show.rate2}, ${show.rate3})`;
          i++;
        } else if (show.date == show.today && show.time > show.current_time) {
          document.querySelectorAll(".book")[
            i
          ].href = `javascript:openModal(${show.id},'${show.alpha_ran}', ${show.rate}, ${show.rate2}, ${show.rate3})`;
          i++;
        } else {
        }
      });
    });

  document.querySelectorAll(".changeIsGood").forEach((item) => {
    item.addEventListener("change", (event) => {
      var movie = document.getElementById("movieName").innerHTML;
      var city = document.getElementById("cities").value;
      var day = document.getElementById("daySelect").value;
      var hall = document.getElementById("hallSelect").value;

      fetch(`/shows/${movie}/${city}/${day}/${hall}`)
        .then((response) => response.json())
        .then((shows) => {
          var table = document.getElementById("showList");
          document.querySelectorAll(".showData").forEach(function (a) {
            a.remove();
          });
          // console.log(shows);
          console.log(shows)
          shows.forEach(function (show) {
            // const show.today = new Date();

            // var show.today=datetime.today()
            // console.log(show.date)
            // console.log(show.today)
            if (show.date > show.today) {
              var row = table.insertRow();
              row.className = "showData";

              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
              var cell6 = row.insertCell(5);
              var a = document.createElement("a");
              var link = document.createTextNode("Select Seat/s");
              a.appendChild(link);
              // a.title = show.time_display;
              a.title = "Select Seat/s";
              a.className = "book";
              
              console.log(show.id, show.rate, show.rate2, show.rate3, show.alpha_range);
              
              a.href = `javascript:openModal(${show.id}, '${show.alpha_range}', ${show.rate}, ${show.rate2} ,${show.rate3})`;

              cell1.innerHTML = show.theatre;
              cell2.innerHTML = `${show.rate} HK\$/-`;
              cell3.innerHTML = show.hall_type;
              // cell4.appendChild(a)
              cell4.innerHTML = show.time_display;
              cell5.innerHTML = show.date_display;
              cell6.appendChild(a);
            } else if (
              show.date == show.today &&
              show.time > show.current_time
            ) {
              var row = table.insertRow();
              row.className = "showData";

              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
              var cell6 = row.insertCell(5);
              var a = document.createElement("a");
              var link = document.createTextNode("Select Seat/s");
              a.appendChild(link);
              // a.title = show.time_display;
              a.title = "Select Seat/s";
              a.className = "book";
              
              
              console.log(show.id, show.rate, show.rate2, show.rate3, show.alpha_range);
              a.href = `javascript:openModal(${show.id}, '${show.alpha_range}', ${show.rate}, ${show.rate2}, ${show.rate3})`;

              cell1.innerHTML = show.theatre;
              cell2.innerHTML = `${show.rate} HK\$/-`;
              cell3.innerHTML = show.hall_type;
              // cell4.appendChild(a)
              cell4.innerHTML = show.time_display;
              cell5.innerHTML = show.date_display;
              cell6.appendChild(a);
            }
          });
        });
    });
  });

  window.addEventListener("click", clickOutside);

  function clickOutside(e) {
    if (e.target == document.getElementById("simpleModal")) {
      document.getElementById("simpleModal").style.display = "none";
      document.getElementById("total_seats").innerHTML = `Seats Selected: 0`;
      document.getElementById("total_cost").innerHTML = `Total Cost: 0`;
    }
  }
  document.querySelector(".ag").addEventListener("click", () => {
    var seatNumber = document.querySelectorAll(".container > .row > .selected");
    var cb = document.querySelector("#agree");
    // console.log(cb.checked);

    if (seatNumber.length > 0) {
      // console.log("if");

      if (cb.checked == true) {
        document.getElementById("processRequest").disabled = false;
      } else {
        // console.log("else");
        document.getElementById("processRequest").disabled = true;
      }
    } else {
      document.getElementById("processRequest").disabled = true;
    }
  });
  document.querySelector(".container").addEventListener("click", (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");//change the color to selected
      var seatNumber = document.querySelectorAll(
        ".container > .row > .selected"
      );

      var first_class1_seats = document.querySelectorAll(
        ".container > .row > .selected.first_class1"
      );
      var second_class2_seats = document.querySelectorAll(
        ".container > .row > .selected.second_class2"
      );
      var third_class3_seats = document.querySelectorAll(
        ".container > .row > .selected.third_class3"
      );
      // console.log(selcted_row);


      var totalSeatCost = first_class1_seats.length * (cost) + second_class2_seats.length * (cost2) + third_class3_seats.length*(cost3);
        
        
        var mylist,mylist2;
        var s=""
        for ([seatRow, seatsList] of Object.entries(seatNumber)) {
            mylist=seatsList.classList[1];
            mylist2=seatsList.classList[3];
            s+=""+mylist2+mylist+", ";
          }
          // console.log(s);
        document.getElementById(
          "total_seats"
        ).innerHTML = `Seats Selected: ${s}`;

      document.getElementById(
        "total_cost"
      ).innerHTML = `Total Cost: ${totalSeatCost} HK\$/-`;
      // console.log(seatNumber);
      document.getElementById('seatnum').innerHTML = `Seat Number: ${seatNumber.length}`
      // console.log()
      var cb = document.querySelector("#agree");
      // console.log(cb.checked)

      if (seatNumber.length > 0) {
        // console.log("if")

        if (cb.checked == true) {
          document.getElementById("processRequest").disabled = false;
        } else {
          // console.log("else")
          document.getElementById("processRequest").disabled = true;
        }
      } else {
        // console.log("else")
        document.getElementById("processRequest").disabled = true;
      }

      // if (seatNumber.length > 0){
      //     document.getElementById('processRequest').disabled = false
      // }
      // else{
      //   if (cb.checked==true){
      //     document.getElementById('processRequest').disabled = true
      //   }

      // }
    }
  });
});

function openModal(show,range_ran,rate,rate2,rate3) {
  cost = rate;
  cost2 = rate2;
  cost3 = rate3;
  console.log(range_ran);
  end_rate1=range_ran[0];
  end_rate2=range_ran[1];

  console.log(end_rate1,end_rate2)
  console.log("hiii")
  document.getElementById("simpleModal").style.display = "flex";
  fetch(`/seats/${show}`)
  .then((response) => response.json())
  .then((seats) => {
    document.querySelectorAll(".container > .row").forEach(function (a) {
      a.remove();
    });
         
   

     var num=1;
     var range1=range_ran.codePointAt(0);
     range1++
     var real_range1=String.fromCharCode(range1)
     var range2=range_ran.codePointAt(1);
     range2++
     var real_range2=String.fromCharCode(range2)
     console.log(real_range1,real_range2)
      for ([seatRow, seatsList] of Object.entries(seats)) {

        var container = document.querySelector(".container");
        var price_div0 = document.createElement("div");
        if (num==1){
          container.appendChild(price_div0);
          price_div0.innerHTML = ` ${cost} HK\$`;
          price_div0.classList.add("price_divv0");
          num++;
        }
        // for every row
        var row = document.createElement("div");
        row.classList.add("row");
        //make a new div for showing the rate
        var price_div1 = document.createElement("div");
        var price_div2 = document.createElement("div");
        
        container.appendChild(price_div2);

        console.log(real_range1);

        if (seatRow == real_range1) {
          container.appendChild(price_div1);
          price_div1.innerHTML = ` ${cost2} HK\$`;
          price_div1.classList.add("price_divv1");
        }
        if (seatRow == real_range2 && real_range2!='Q') {
          container.appendChild(price_div2);
          price_div2.innerHTML = ` ${cost3} HK\$`;
          price_div2.classList.add("price_divv2");
        }
      
        
        
        row.classList.add(`${seatRow}`);    
        // For row name (A,B,C,D)
        var r_n = document.createElement("div");
        r_n.classList.add("row_number");
        //Container k andar row wala div        
        container.appendChild(row);
        //first div for A,B,C,D
        row.appendChild(r_n);
        r_n.innerHTML = `${seatRow}`;        
        
        
        
        for ([number, vacancy] of Object.entries(seatsList)) {
          var seat = document.createElement("div");

          if (
            (seatRow == "B" && `${number}` == 19) ||
            (seatRow == "D" && `${number}` == 19) ||
            (seatRow == "F" && `${number}` == 19) ||
            (seatRow == "H" && `${number}` == 19) ||
            (seatRow == "J" && `${number}` == 19) ||
            (seatRow == "L" && `${number}` == 19) ||
            (seatRow == "N" && `${number}` == 19) ||
            (seatRow == "P" && `${number}` == 19) || ((seatRow=="Q")&&((`${number}` == 1)||(`${number}` == 2)||(`${number}` == 3)||(`${number}` == 5)||(`${number}` == 6)||(`${number}` == 7)||(`${number}` == 20)||(`${number}` == 21)))
          ) {
            seat.classList.add("notavail");
            seat.classList.add("notthere");
          } else {
            seat.classList.add("seat");
            seat.classList.add(`${number}`);
            if (`${vacancy}` == "Occupied") {
              seat.classList.add("occupied");
            }
          }
          // console.log(seatRow,real_range1,real_range2)
          if (seatRow <= end_rate1) {
            seat.classList.add("first_class1");
            // console.log("First class hu ")
          } 
          else if (seatRow > end_rate1 && seatRow <= end_rate2){
            seat.classList.add("second_class2");
            // console.log("second class hu ")
          }else {
            // console.log("third class hu ")
            seat.classList.add("third_class3");
          }
          
          
          seat.classList.add(seatRow);
          row.appendChild(seat);
        }
        // console.log(cost3);
        var r1_n = document.createElement("div");
        r1_n.classList.add("row_right_number");

        
        
        row.appendChild(r1_n);
        r1_n.innerHTML = `${seatRow}`;
      }
    });

  document.getElementById("bookTicketDiv").addEventListener("submit", () => {
    var seatList = new Array();
    document
      .querySelectorAll(".container > .row > .selected")
      .forEach(function (a) {
        seatList.push(
          `${a.parentElement.classList.item(1)}${a.classList.item(1)}`
        );
      });
      // console.log("ticket");
        fetch(`/ticket`,{method: "POST",body: JSON.stringify({show: show,seatList: seatList,}),}
        ).then((response)=> { 
          console.log(response.status)
          if(response.status>=500){
             alert('Please Try Again there were some overlapping tickets');             
          }
         });
  });
}
