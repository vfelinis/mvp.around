(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"7vJP":function(c,n,o){"use strict";o.r(n);var t=o("ofXK"),e=o("YUcS"),i=o("Wp6s"),a=o("bTqV"),s=o("tyNb"),r=o("fXoL"),b=o("5zyh"),d=o("Y790"),u=o("XiUz"),l=o("zpSk");function p(c,n){1&c&&(r.Rb(0,"div",4),r.Rb(1,"mat-card"),r.uc(2," You need to allow geolocation in browser! "),r.Qb(),r.Qb())}function g(c,n){if(1&c){const c=r.Sb();r.Rb(0,"div"),r.Rb(1,"mat-card"),r.Rb(2,"div",4),r.uc(3,"You are not logged!"),r.Qb(),r.Rb(4,"button",5),r.Zb("click",(function(n){return r.mc(c),r.cc().signinPopup()})),r.uc(5," Sign in "),r.Qb(),r.Qb(),r.Qb()}}function m(c,n){1&c&&(r.Rb(0,"div"),r.Rb(1,"mat-card"),r.Rb(2,"div",4),r.uc(3,"Welcome!"),r.Qb(),r.Rb(4,"a",6),r.uc(5," Jump inside "),r.Qb(),r.Qb(),r.Qb())}const f=[{path:"",component:(()=>{class c{constructor(c,n){this.geolocationService=c,this.oidcFacade=n,this.geolocation$=this.geolocationService.selectGeolocation(),this.loggedIn$=this.oidcFacade.loggedIn$}ngOnInit(){}signinPopup(){this.oidcFacade.signinPopup()}}return c.\u0275fac=function(n){return new(n||c)(r.Mb(b.a),r.Mb(d.b))},c.\u0275cmp=r.Gb({type:c,selectors:[["app-home"]],decls:10,vars:9,consts:[["id","primary-header",1,"mat-h1"],["fxLayout","column","fxLayoutAlign","center","gdAlignColumns","center","fxLayoutGap","10px"],["class","mat-h2",4,"ngIf"],[4,"ngIf"],[1,"mat-h2"],["mat-raised-button","","color","primary",3,"click"],["routerLink","/groups","mat-raised-button","","color","primary"]],template:function(c,n){1&c&&(r.Rb(0,"div",0),r.Rb(1,"span"),r.uc(2,"Home"),r.Qb(),r.Qb(),r.Rb(3,"div",1),r.sc(4,p,3,0,"div",2),r.dc(5,"async"),r.sc(6,g,6,0,"div",3),r.dc(7,"async"),r.sc(8,m,6,0,"div",3),r.dc(9,"async"),r.Qb()),2&c&&(r.Bb(4),r.hc("ngIf",!r.ec(5,3,n.geolocation$).isAvailable),r.Bb(2),r.hc("ngIf",!r.ec(7,5,n.loggedIn$)),r.Bb(2),r.hc("ngIf",r.ec(9,7,n.loggedIn$)))},directives:[u.d,u.c,l.b,u.e,t.k,i.a,a.b,s.c,a.a],pipes:[t.b],styles:[""],changeDetection:0}),c})()}];let h=(()=>{class c{}return c.\u0275mod=r.Kb({type:c}),c.\u0275inj=r.Jb({factory:function(n){return new(n||c)},imports:[[s.d.forChild(f)],s.d]}),c})();o.d(n,"HomeModule",(function(){return v}));let v=(()=>{class c{}return c.\u0275mod=r.Kb({type:c}),c.\u0275inj=r.Jb({factory:function(n){return new(n||c)},imports:[[t.c,h,e.a,i.b,a.c]]}),c})()}}]);