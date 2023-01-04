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
          ].href = `javascript:openModal(${show.id}, ${show.rate})`;
          i++;
        } else if (show.date == show.today && show.time > show.current_time) {
          document.querySelectorAll(".book")[
            i
          ].href = `javascript:openModal(${show.id}, ${show.rate})`;
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
              a.href = `javascript:openModal(${show.id}, ${show.rate})`;

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
              a.href = `javascript:openModal(${show.id}, ${show.rate})`;

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
        console.log("else");
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

      var cheap_seats = document.querySelectorAll(
        ".container > .row > .selected.cheap"
      );
      var exp_seats = document.querySelectorAll(
        ".container > .row > .selected.exp"
      );
      var selcted_row = document.querySelectorAll(
        ".container > .row > .selected"
      );
      // console.log(selcted_row);


      var totalSeatCost =
        cheap_seats.length * (cost - 20) + exp_seats.length * cost;
        
        
        var mylist,mylist2;
        let s=""
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

function openModal(show, rate) {
  cost = rate;
  document.getElementById("simpleModal").style.display = "flex";
  // console.log(`/seats/${show}`);
  fetch(`/seats/${show}`)
    .then((response) => response.json())
    .then((seats) => {
      document.querySelectorAll(".container > .row").forEach(function (a) {
        a.remove();
      });
      // all the lines for money
      let num = 1;
      // var ulline = document.createElement("div");
      // ulline.classList.add("verticalLine");
      // ulline.setAttribute("id", "ull");
      // var urline = document.createElement("div");
      // urline.setAttribute("id", "url");
      // urline.classList.add("urli");
      // var dlline = document.createElement("div");
      // dlline.setAttribute("id", "dll");
      // dlline.classList.add("dvl");
      // var drline = document.createElement("div");
      // drline.setAttribute("id", "drl");
      // drline.classList.add("drli");

      
      for ([seatRow, seatsList] of Object.entries(seats)) {
        // console.log("Hi i am here")
        // console.log(seatRow);
        var container = document.querySelector(".container");
        // if (num == 1) {
        //   container.appendChild(ulline);
        //   container.appendChild(urline);
        //   container.appendChild(dlline);
        //   container.appendChild(drline);
        //   document.getElementById("ull").innerHTML = `180`;
        //   document.getElementById("url").innerHTML = `180`;
        //   document.getElementById("dll").innerHTML = `200`;
        //   document.getElementById("drl").innerHTML = `200`;
        //   num = 2;
        // }conso
        var row = document.createElement("div");
        row.classList.add("row");
        row.classList.add(`${seatRow}`);

        var r_n = document.createElement("div");
        r_n.classList.add("row_number");

        
        container.appendChild(row);
        row.appendChild(r_n);
        r_n.innerHTML = `${seatRow}`;
        

        for ([number, vacancy] of Object.entries(seatsList)) {
          var seat = document.createElement("div");

          if (
            seatRow == "B" ||
            (`${number}` == 13 && seatRow != "Q") ||
            (seatRow == "C" &&
              `${number}` != 5 &&
              seatRow == "C" &&
              `${number}` != 6 &&
              seatRow == "C" &&
              `${number}` != 7 &&
              seatRow == "C" &&
              `${number}` != 8 &&
              seatRow == "C" &&
              `${number}` != 9)
          ) {
            seat.classList.add("notavail");
          } else if (
            (seatRow == "B" && `${number}` == 19) ||
            (seatRow == "D" && `${number}` == 19) ||
            (seatRow == "F" && `${number}` == 19) ||
            (seatRow == "H" && `${number}` == 19) ||
            (seatRow == "J" && `${number}` == 19) ||
            (seatRow == "L" && `${number}` == 19) ||
            (seatRow == "N" && `${number}` == 19) ||
            (seatRow == "P" && `${number}` == 19)
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
          if (seatRow <= "F") {
            seat.classList.add("cheap");
          } else seat.classList.add("exp");
          
          seat.classList.add(seatRow);
          row.appendChild(seat);
        }
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
        fetch(`/ticket`, {method: "POST",body: JSON.stringify({show: show,seatList: seatList,}),});
  });
}
