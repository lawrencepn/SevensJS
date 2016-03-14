'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /demo-csv when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/demo-csv");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/demo-csv');
    });


    it('should render demo-csv when user navigates to /demo-csv', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/demo-pdf');
    });


    it('should render demo-pdf when user navigates to /demo-pdf', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
