JQM-FB-Style-Slide-Menu
=======================

This is a jQuery Mobile plugin for FB-style slide menu base on [tegansnyder's JQuery-Mobile-Slide-Menu](https://github.com/tegansnyder/JQuery-Mobile-Slide-Menu). 

This version is fit to multiple pages, and each page can have different slide menu.

## Install and Usage

The installation and usage are the same as original version.

## Use with PhoneGap

Because the versions below Android 4.0.3 and iOS 5 do not support the CSS property "overflow: auto" and "overflow: scroll", so the scroll of slidemenu will not working when you use the slidemenu in a PhoneGap app which running on those versions.

For fixing this bug, I write a version for PhoneGap app, using pure javascript solution to solve this problem.

It is not so perfect now, because I have not add the "swipe" behavior handler on it yet. But the scroll of slidemenu is working now, when user touch the slidemenu and move up or down.

## Blog

If you have any question or suggestion, welcome to visit my [blog](http://aio1108.pixnet.net/blog).