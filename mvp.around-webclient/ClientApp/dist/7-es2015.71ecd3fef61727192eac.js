(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"7vJP":function(n,c,t){"use strict";t.r(c),t.d(c,"HomeModule",(function(){return v}));var o=t("ofXK"),e=t("YUcS"),i=t("Wp6s"),a=t("bTqV"),r=t("tyNb"),s=t("fXoL"),b=t("5zyh"),u=t("lGQG"),d=t("XiUz"),l=t("zpSk");function p(n,c){1&n&&(s.Rb(0,"div",4),s.Rb(1,"mat-card"),s.uc(2," You need to allow geolocation in browser! "),s.Qb(),s.Qb())}function g(n,c){if(1&n){const n=s.Sb();s.Rb(0,"div"),s.Rb(1,"mat-card"),s.Rb(2,"div",4),s.uc(3,"You are not logged!"),s.Qb(),s.Rb(4,"button",5),s.Zb("click",(function(){return s.mc(n),s.cc().signinPopup()})),s.uc(5," Sign in "),s.Qb(),s.Qb(),s.Qb()}}function m(n,c){1&n&&(s.Rb(0,"div"),s.Rb(1,"mat-card"),s.Rb(2,"div",4),s.uc(3,"Welcome!"),s.Qb(),s.Rb(4,"a",6),s.uc(5," Jump inside "),s.Qb(),s.Qb(),s.Qb())}const f=[{path:"",component:(()=>{class n{constructor(n,c){this.geolocationService=n,this.authService=c,this.geolocation$=this.geolocationService.selectGeolocation(),this.loggedIn$=this.authService.selectloggedIn()}ngOnInit(){}signinPopup(){this.authService.signinPopup()}}return n.\u0275fac=function(c){return new(c||n)(s.Mb(b.a),s.Mb(u.a))},n.\u0275cmp=s.Gb({type:n,selectors:[["app-home"]],decls:10,vars:9,consts:[["id","primary-header",1,"mat-h1"],["fxLayout","column","fxLayoutAlign","center","gdAlignColumns","center","fxLayoutGap","10px"],["class","mat-h2",4,"ngIf"],[4,"ngIf"],[1,"mat-h2"],["mat-raised-button","","color","primary",3,"click"],["routerLink","/groups","mat-raised-button","","color","primary"]],template:function(n,c){1&n&&(s.Rb(0,"div",0),s.Rb(1,"span"),s.uc(2,"Home"),s.Qb(),s.Qb(),s.Rb(3,"div",1),s.sc(4,p,3,0,"div",2),s.dc(5,"async"),s.sc(6,g,6,0,"div",3),s.dc(7,"async"),s.sc(8,m,6,0,"div",3),s.dc(9,"async"),s.Qb()),2&n&&(s.Bb(4),s.hc("ngIf",!s.ec(5,3,c.geolocation$).isAvailable),s.Bb(2),s.hc("ngIf",!s.ec(7,5,c.loggedIn$)),s.Bb(2),s.hc("ngIf",s.ec(9,7,c.loggedIn$)))},directives:[d.d,d.c,l.b,d.e,o.k,i.a,a.b,r.c,a.a],pipes:[o.b],styles:[""],changeDetection:0}),n})()}];let h=(()=>{class n{}return n.\u0275mod=s.Kb({type:n}),n.\u0275inj=s.Jb({factory:function(c){return new(c||n)},imports:[[r.d.forChild(f)],r.d]}),n})(),v=(()=>{class n{}return n.\u0275mod=s.Kb({type:n}),n.\u0275inj=s.Jb({factory:function(c){return new(c||n)},imports:[[o.c,h,e.a,i.b,a.c]]}),n})()}}]);