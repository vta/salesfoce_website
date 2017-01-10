function addJS(linkurl) {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = linkurl;
  document.getElementsByTagName('head')[0].appendChild(s);
}

addJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCkuX9l0E9Q1cxvmHpwdwWEsFs1rBIBvlg&libraries=places&callback=initializeField')

function initializeField() {
  ids = ['desktopFrom', 'desktopTo', 'mobileFrom', 'mobileTo', 'g_desktopFrom', 'g_desktopTo', 'g_mobileFrom', 'g_mobileTo']
  for (i in ids) {
    var input = document.getElementById(ids[i]);
    if (input) {
      var autocomplete = new google.maps.places.Autocomplete(input);
    }
  }
}





$(document).ready(function() {

  $(".switcher >*").click(function(e) {
    $(".switcher >*").removeClass("active");
    $(this).toggleClass("active");

    $(".forms >*").addClass("hidden");
    var formSelected = 'form_' + this.id.split('_')[1]
    $("#" + formSelected).removeClass("hidden")
    $("#" + formSelected + '_mobile').removeClass("hidden")

  });

  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  function setCurrentTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = Math.round(minutes / 5) * 5;
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // var strTime = hours + ':' + minutes + ' ' + ampm;
    $('#hourPicker').val(hours);
    $('#g_hourPicker').val(hours);
    $('#hourPickerMobile').val(hours);
    $('#g_hourPickerMobile').val(hours);
    $('.inputForm[name="minute"]').val(minutes);
    $('.g_inputForm[name="minute"]').val(minutes);
    $('#period').val(ampm);
    $('#g_period').val(ampm);
    $('#periodMobile').val(ampm);
    //return strTime;
  }
  setCurrentTime(new Date());
  console.log('ready_functions')
  $('#g_topTripplannerForm').submit(function() {
    console.log('g_toptripplanner?')
    hour = $('#g_hourPicker option:selected').text();
    minute = $('#g_minutePicker option:selected').text();
    period = $('#g_period option:selected').text();
    timeString = hour + ':' + minute + period;
    ('#timeField').attr('value', timeString);
  })

  $('#topTripplannerForm').submit(function() {
    hour = $('#hourPicker option:selected').text();
    // minute=$j('.inputForm[name="minute"] option:selected').text();
    period = $('#period option:selected').text();
    if (period == 'PM' && hour != '12') {
      hour = parseInt(hour) + 12
    }
    $('#hourField').attr({
      'value': hour
    });
    // $j('#timeField').attr('value',timeString);
  });
  $('#mobileTripPlannerForm').submit(function() {
    var setDate = $("#datepickermobile").val().split('-');
    var dateString = ""
    if (setDate.length > 1) {
      dateString = setDate[1] + ":" + setDate[2] + ":" + setDate[0]
        // var dateString = setDate.getUTCMonth()+1 + ":" +setDate.getUTCDate() + ":" + setDate.getUTCFullYear();
      } else {
        var currentTime = new Date();
        dateString = currentTime.getUTCMonth() + 1 + ":" + currentTime.getUTCDate() + ":" + currentTime.getUTCFullYear();
      }
      $('#mobileDate').attr({
        'value': dateString
      });

      hour = $('#hourPickerMobile option:selected').text();
      period = $('#periodMobile option:selected').text();
      if (period == 'PM' && hour != '12') {
        hour = parseInt(hour) + 12
      }
      $('#hourFieldMobile').attr({
        'value': hour
      });
    });
  $("#datepickercalendar").datepicker({
    altField: "#altDate",
    altFormat: 'mm:dd:yy',
    dateFormat: "mm/dd/yy"
  })
});
