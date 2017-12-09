"use strict";

const app = angular.module("app", []);

app.controller("main", ["$scope", "$rootScope", "$timeout", "$interval", function($scope, $rootScope, $timeout, $interval){
  $scope.company = "entertainment ready";
  $scope.randomBoxColor = '#5C00BB';
  $scope.boxes = [1,   2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  $scope.homepage = true;
  $scope.homepageCheckVar = true;
  $scope.navigate = (e) => {
    const className = e.target.className;
    if (className.includes("homeNav") || className.includes("logo")) { movePageFn(0, 0) }
    else if (className.includes("aboutNav")) { movePageFn(-90, 1) }
    else if (className.includes("eventNav")) { movePageFn(-180, 2) }
    else if (className.includes("membershipsNav")) { movePageFn(-270, 3) }
    else if (className.includes("partnerships")) { movePageFn(-360, 4) }
    else if (className.includes("contactNav")) { movePageFn(-450, 5) }
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
  $scope.randomHighlight = (low, high) => {
    const randomBoxDataNumber = Math.floor(Math.random() * high) + low;
    $(".colorBox[data="+randomBoxDataNumber+"]").css("backgroundColor", $scope.randomBoxColor);
  }
  $scope.resetHighlight = () => {
    $(".colorBox").css("backgroundColor", "");
  }
  $scope.homepageCheck = () => {
    if($scope.homepage === true){
      $scope.homepageCheckVar = true;
      $(".colorBoxHolder").fadeIn(600);
    } else {
      $scope.homepageCheckVar = false;
      $(".colorBoxHolder").fadeOut(600);
    }
  }
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

  //CONSTANTS
  let open = false;
  const $event = $(".eventPreview");
  const $eventHeading = $(".eventHeading");
  const $eventPageBody = $(".eventPageBody");
  const $eventDetailsBox = $('.eventDetailsBox');

  //METHODS
  const movePageFn = (position, highlightNumber) => {
    $scope.movePage(position);
    $scope.navHighlight(highlightNumber);
  }
  const fadeInRight = (selector, time) => {
    $(selector).css("color", "#FFF");

    $(selector).animate({
      left: "0",
    }, {
      duration: time,
      start: () => { $(selector).fadeIn(250) }
    });
  }

  //PAGE START UP FUNCTIONALITY
  $eventDetailsBox.fadeOut(10);
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
  $timeout(function () { $(".hometext").fadeIn(2000) }, 1000);
  $interval(function () {
    $scope.homepageCheck();
  });

}]);
