"use strict";

const app = angular.module("app", []);

app.controller("main", ["$scope", "$rootScope", "$timeout", "$interval", function($scope, $rootScope, $timeout, $interval){
  $scope.company = "entertainment ready";
  $rootScope.page = 'kids';
  $scope.navigate = (e) => {
    if($scope.canNav){
      const className = e.target.className;
      const selector = e.target.attributes.data.nodeValue;
      if (className.includes("homeNav") || className.includes("logo")) {
        $scope.movePage(0);
        $scope.navHighlight(0);
      } else if (className.includes("aboutNav")) {
        $scope.movePage(-90);
        $scope.navHighlight(1);
      } else if (className.includes("eventNav")) {
        $scope.movePage(-180);
        $scope.navHighlight(2);
      } else if (className.includes("membershipsNav")) {
        $scope.movePage(-270);
        $scope.navHighlight(3);
      } else if (className.includes("partnerships")) {
        $scope.movePage(-360);
        $scope.navHighlight(4);
      } else if (className.includes("contactNav")) {
        $scope.movePage(-450);
        $scope.navHighlight(5);
      }
    }
  };
  $scope.movePage = (location) => {
    $(".pages").fadeOut("200");
    $(".action").css("top", location + "vh");
    $(".picSection").css("top", location + "vh");
    $timeout(() => {
      $(".pages").fadeIn("200");
    }, 1200);
  }
  $scope.navHighlight = (data) => {
    $(".menuOption").removeClass("menuHighlight");
    $(".menuOption[data="+data+"]").addClass("menuHighlight");

    if(data === 0){
      $scope.homepage = true;
    } else {
      $scope.homepage = false;
    }

  }
  $scope.randomBoxColor = '#5C00BB';
  $scope.boxes = [1,   2,  3,  4,  5,  6,  7,  8,  9, 10,
                  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                  21, 22, 23, 24, 25];
  $scope.randomHighlight = (low, high) => {
    const randomBoxDataNumber = Math.floor(Math.random() * high) + low;
    $(".colorBox[data="+randomBoxDataNumber+"]").css("backgroundColor", $scope.randomBoxColor);
  }
  $scope.kidsPage = () => {
    $('.landingPage').hide();
    $scope.randomBoxColor = '#ff4f4d';
    $timeout(() => { $('.kids').show() });
    $timeout(() => { choiceMade = true }, 200);
  }
  $scope.datePage = () => {
    $('.landingPage').hide();
    $scope.randomBoxColor = '#5C00BB';
    $timeout(() => { $('.dating').show() });
    $timeout(() => { choiceMade = true }, 200);
  }
  $scope.resetHighlight = () => {
    $(".colorBox").css("backgroundColor", "");
  }

  let choiceMade = true; //false;
  $(".menuOption[data='5']").css('color', '#fff');
  const waitingOnPageLoad = $interval(() => {
    if(choiceMade){
      $interval.cancel(waitingOnPageLoad);

      const fadeInRight = (selector, time) => {
        $(selector).css("color", "#FFF");

        $(selector).animate({
          left: "0",
        }, {
          duration: time,
          start: () => { $(selector).fadeIn(250) }
        });
      }
      $timeout(function () { fadeInRight(".menuOption[data='4']", 50) }, 200);
      $timeout(function () { fadeInRight(".menuOption[data='3']", 50) }, 400);
      $timeout(function () { fadeInRight(".menuOption[data='2']", 50) }, 600);
      $timeout(function () { fadeInRight(".menuOption[data='1']", 50) }, 800);
      $timeout(function () { fadeInRight(".menuOption[data='0']", 50) }, 1000);

      $timeout(() => {
        $(".colorBoxHolder").fadeIn(3000);
        $scope.randomHighlight(1, 25);
        $scope.randomHighlight(1, 25);
        $scope.randomHighlight(1, 25);
        $scope.randomHighlight(1, 25);
      }, 1200);
      $interval(function () {
        if($scope.homepageCheckVar){
          $scope.resetHighlight();
          $scope.randomHighlight(1, 25);
          $scope.randomHighlight(1, 25);
          $scope.randomHighlight(1, 25);
          $scope.randomHighlight(1, 25);
        }
      }, 6000);
    }
  });
  $scope.canNav = false;

  $timeout(function () {
    $(".hometext").fadeIn(2000);
    $scope.canNav = true;
  }, 1000);

  $scope.homepage = true;
  $scope.homepageCheckVar = true;

  $scope.homepageCheck = () => {
    if($scope.homepage === true){
      $scope.homepageCheckVar = true;
      $(".colorBoxHolder").fadeIn(600);
    } else {
      $scope.homepageCheckVar = false;
      $(".colorBoxHolder").fadeOut(600);
    }
  }

  $interval(function () {
    $scope.homepageCheck();
  });

  let open = false;
  const $event = $(".eventPreview");
  const $eventHeading = $(".eventHeading");
  const $eventPageBody = $(".eventPageBody");
  const $eventDetailsBox = $('.eventDetailsBox');

  $eventDetailsBox.fadeOut(10);

  $scope.eventClick = (e) => {
    const event = e.currentTarget.className;
    if(open === true){
      return null;
    } else if (open === false){
      $eventHeading.fadeOut();
      $eventPageBody.fadeOut();
      $timeout(() => {
        $eventDetailsBox.fadeIn();
        if(event.includes('firstBox')){
          console.log('first');
        } else if (event.includes('secondBox')) {
          console.log('second');
        } else if (event.includes('thirdBox')) {
          console.log('third');
        }
      }, 1000);
    }
    open = !open;
  }

}]);
