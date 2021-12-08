if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
if(typeof (window.TSControlsNamespace.Box)=="undefined"||typeof (window.TSControlsNamespace.Box.Version)==null||window.TSControlsNamespace.Box.Version<1){
window.TSControlsNamespace.Box={Version:1,GetOuterWidth:function(_1){
return _1.offsetWidth;
},GetOuterHeight:function(_2){
return _2.offsetHeight;
},SetOuterHeight:function(_3,_4){
if(_4<=0||_4==""){
_3.style.height="";
}else{
_3.style.height=_4+"px";
var _5=_3.offsetHeight-_4;
var _6=_4-_5;
if(_6>0){
_3.style.height=_6+"px";
}else{
_3.style.height="";
}
}
},SetOuterWidth:function(_7,_8){
if(_8<=0||_8==""){
_7.style.width="";
}else{
_7.style.width=_8+"px";
var _9=_7.offsetWidth-_8;
var _a=_8-_9;
if(_a>0){
_7.style.width=_a+"px";
}else{
_7.style.width="";
}
}
},GetPropertyValue:function(_b,_c){
var _d=this.GetStyle(_b);
return this.GetStyleValues(_d,_c);
},GetStyle:function(_e){
if(document.defaultView&&document.defaultView.getComputedStyle){
return document.defaultView.getComputedStyle(_e,null);
}else{
if(_e.currentStyle){
return _e.currentStyle;
}else{
return _e.style;
}
}
}};
};if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
if(typeof (window.TSControlsNamespace.Browser)=="undefined"||typeof (window.TSControlsNamespace.Browser.Version)==null||window.TSControlsNamespace.Browser.Version<1){
window.TSControlsNamespace.Browser={Version:1};
window.TSControlsNamespace.Browser.ParseBrowserInfo=function(){
this.IsMacIE=(navigator.appName=="Microsoft Internet Explorer")&&((navigator.userAgent.toLowerCase().indexOf("mac")!=-1)||(navigator.appVersion.toLowerCase().indexOf("mac")!=-1));
this.IsSafari=(navigator.userAgent.toLowerCase().indexOf("safari")!=-1);
this.IsMozilla=window.netscape&&!window.opera;
this.IsNetscape=/Netscape/.test(navigator.userAgent);
this.IsOpera=window.opera;
this.IsOpera9=window.opera&&(parseInt(window.opera.version())>8);
this.IsIE=!this.IsMacIE&&!this.IsMozilla&&!this.IsOpera&&!this.IsSafari;
this.IsIE7=/MSIE 7/.test(navigator.appVersion);
this.StandardsMode=this.IsSafari||this.IsOpera9||this.IsMozilla||document.compatMode=="CSS1Compat";
this.IsMac=/Mac/.test(navigator.userAgent);
};
TSControlsNamespace.Browser.ParseBrowserInfo();
};if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
if(typeof (window.TSControlsNamespace.DomEventMixin)=="undefined"||typeof (window.TSControlsNamespace.DomEventMixin.Version)==null||window.TSControlsNamespace.DomEventMixin.Version<2){
TSControlsNamespace.DomEventMixin={Version:2,Initialize:function(_1){
_1.CreateEventHandler=this.CreateEventHandler;
_1.AttachDomEvent=this.AttachDomEvent;
_1.DetachDomEvent=this.DetachDomEvent;
_1.DisposeDomEventHandlers=this.DisposeDomEventHandlers;
_1._domEventHandlingEnabled=true;
_1.EnableDomEventHandling=this.EnableDomEventHandling;
_1.DisableDomEventHandling=this.DisableDomEventHandling;
_1.RemoveHandlerRegister=this.RemoveHandlerRegister;
_1.GetHandlerRegister=this.GetHandlerRegister;
_1.AddHandlerRegister=this.AddHandlerRegister;
_1.handlerRegisters=[];
},EnableDomEventHandling:function(){
this._domEventHandlingEnabled=true;
},DisableDomEventHandling:function(){
this._domEventHandlingEnabled=false;
},CreateEventHandler:function(_2,_3){
var _4=this;
return function(e){
if(!_4._domEventHandlingEnabled&&!_3){
return false;
}
return _4[_2](e||window.event);
};
},AttachDomEvent:function(_6,_7,_8,_9){
var _a=this.CreateEventHandler(_8,_9);
var _b=this.GetHandlerRegister(_6,_7,_8);
if(_b!=null){
this.DetachDomEvent(_b.Element,_b.EventName,_8);
}
var _c={"Element":_6,"EventName":_7,"HandlerName":_8,"Handler":_a};
this.AddHandlerRegister(_c);
if(_6.addEventListener){
_6.addEventListener(_7,_a,false);
}else{
if(_6.attachEvent){
_6.attachEvent("on"+_7,_a);
}
}
},DetachDomEvent:function(_d,_e,_f){
var _10=null;
var _11="";
if(typeof _f=="string"){
_11=_f;
_10=this.GetHandlerRegister(_d,_e,_11);
if(_10==null){
return;
}
_f=_10.Handler;
}
if(!_d){
return;
}
if(_d.removeEventListener){
_d.removeEventListener(_e,_f,false);
}else{
if(_d.detachEvent){
_d.detachEvent("on"+_e,_f);
}
}
if(_10!=null&&_11!=""){
this.RemoveHandlerRegister(_10);
_10=null;
}
},DisposeDomEventHandlers:function(){
for(var i=0;i<this.handlerRegisters.length;i++){
var _13=this.handlerRegisters[i];
if(_13!=null){
this.DetachDomEvent(_13.Element,_13.EventName,_13.Handler);
}
}
this.handlerRegisters=[];
},RemoveHandlerRegister:function(_14){
try{
var _15=_14.index;
for(var i in _14){
_14[i]=null;
}
this.handlerRegisters[_15]=null;
}
catch(e){
}
},GetHandlerRegister:function(_17,_18,_19){
for(var i=0;i<this.handlerRegisters.length;i++){
var _1b=this.handlerRegisters[i];
if(_1b!=null&&_1b.Element==_17&&_1b.EventName==_18&&_1b.HandlerName==_19){
return this.handlerRegisters[i];
}
}
return null;
},AddHandlerRegister:function(_1c){
_1c.index=this.handlerRegisters.length;
this.handlerRegisters[this.handlerRegisters.length]=_1c;
}};
TSControlsNamespace.DomEvent={};
TSControlsNamespace.DomEvent.PreventDefault=function(e){
if(!e){
return true;
}
if(e.preventDefault){
e.preventDefault();
}
e.returnValue=false;
return false;
};
TSControlsNamespace.DomEvent.StopPropagation=function(e){
if(!e){
return;
}
if(e.stopPropagation){
e.stopPropagation();
}else{
e.cancelBubble=true;
}
};
TSControlsNamespace.DomEvent.GetTarget=function(e){
if(!e){
return null;
}
return e.target||e.srcElement;
};
TSControlsNamespace.DomEvent.GetRelatedTarget=function(e){
if(!e){
return null;
}
return e.relatedTarget||(e.type=="mouseout"?e.toElement:e.fromElement);
};
TSControlsNamespace.DomEvent.GetKeyCode=function(e){
if(!e){
return 0;
}
return e.which||e.keyCode;
};
};if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
if(typeof (window.TSControlsNamespace.Ease)=="undefined"||typeof (window.TSControlsNamespace.Ease.Version)==null||window.TSControlsNamespace.Ease.Version<1.1){
TSControlsNamespace.Ease=function(_1,_2,_3,_4,_5,_6){
this.Element=_1;
if(_6){
this.Overlay=new TSControlsNamespace.Overlay(_1);
}
this.OffsetX=_3;
this.OffsetY=_4;
this.Invert=false;
var _7=this.Element.parentNode;
this.ExpandConfig=this.MergeConfig(_2.ExpandAnimation);
this.CollapseConfig=this.MergeConfig(_2.CollapseAnimation);
this.Ticker=new TSControlsNamespace.Ticker(this);
this.Listener=_5;
this.SlideParent=false;
};
TSControlsNamespace.Ease.Version=1.1;
TSControlsNamespace.Ease.Coef=0;
TSControlsNamespace.Ease.prototype={SetSide:function(_8){
this.InitialSide=_8.charAt(0).toUpperCase()+_8.substr(1,_8.length-1);
this.Invert=false;
if(_8=="right"){
_8="left";
this.Invert=true;
}
if(_8=="bottom"){
_8="top";
this.Invert=true;
}
this.Side=_8;
this.Horizontal=_8=="left";
},MergeConfig:function(_9){
if(!_9.Type){
_9.Type="OutQuint";
}
if(!_9.Duration){
_9.Duration=200;
}
return _9;
},GetSide:function(){
return this.InitialSide;
},ShowElements:function(){
this.Element.parentNode.style.display="block";
this.Element.style.display="block";
this.Element.parentNode.style.overflow="hidden";
},Dispose:function(){
this.Ticker.Stop();
this.Element=null;
if(this.Overlay){
this.Overlay.Dispose();
}
},ResetState:function(_a){
this.ShowElements();
if(_a){
var _b=(this.Horizontal?this.Element.offsetWidth:this.Element.offsetHeight);
if(!this.Invert){
_b=-_b;
}
this.SetPosition(_b);
}
this.InitialPosition=this.GetPosition();
},UpdateContainerSize:function(){
if(!this.Element.parentNode){
return;
}
if(!this.Element.offsetWidth||!this.Element.offsetHeight){
return;
}
if(this.Invert){
if(this.Side=="left"){
this.Element.parentNode.style.height=this.Element.offsetHeight+"px";
}else{
if(this.Side=="top"){
this.Element.parentNode.style.width=this.Element.offsetWidth+"px";
}
}
return;
}
var _c=0;
var _d=0;
if(this.Element.style.top!=""){
_c=Math.max(parseInt(this.Element.style.top),0);
}
if(this.Element.style.left!=""){
_d=Math.max(parseInt(this.Element.style.left),0);
}
if(this.SlideParent){
_c=parseInt(this.Element.style.top);
if(isNaN(_c)){
_c=0;
}
}
if(typeof (TSMenuItem)!="undefined"&&this.Listener instanceof TSMenuItem){
if(this.Element.parentNode.style.height!=this.Element.offsetHeight+_c+"px"){
this.Element.parentNode.style.height=Math.max(this.Element.offsetHeight+_c,0)+"px";
}
if(this.Element.parentNode.style.width!=(this.Element.offsetWidth+_d)+"px"){
this.Element.parentNode.style.width=Math.max(this.Element.offsetWidth+_d,0)+"px";
}
}else{
if(this.Element.parentNode.offsetHeight!=this.Element.offsetHeight+_c){
this.Element.parentNode.style.height=Math.max(this.Element.offsetHeight+_c,0)+"px";
}
if(this.Element.parentNode.offsetWidth!=(this.Element.offsetWidth+_d)){
this.Element.parentNode.style.width=Math.max(this.Element.offsetWidth+_d,0)+"px";
}
}
},GetSize:function(){
return this.Horizontal?this.Element.offsetWidth:this.Element.offsetHeight;
},GetPosition:function(){
if(!this.Element.style[this.Side]){
return 0;
}
return parseInt(this.Element.style[this.Side]);
},SetPosition:function(_e){
this.Element.style[this.Side]=_e+"px";
},Out:function(){
this.ResetState();
this.Direction=-1;
if(this.Invert){
this.Delta=this.GetSize()-this.GetPosition();
}else{
this.Delta=this.GetPosition()-this.GetSize();
}
this.Start(this.CollapseConfig);
},In:function(){
this.ResetState(true);
this.Direction=1;
this.Delta=-this.GetPosition();
this.Start(this.ExpandConfig);
},Start:function(_f){
if(_f.Type=="None"){
this.UpdateContainerSize();
this.Ticker.Stop();
this.ChangePosition(this.InitialPosition+this.Delta);
if(this.Overlay){
this.Overlay.Update();
}
this.UpdateContainerSize();
this.OnTickEnd();
return;
}
this.Tween=_f.Type;
this.Ticker.Configure(_f);
this.Ticker.Start();
this.UpdateContainerSize();
},ChangePosition:function(_10){
if(isNaN(_10)){
return;
}
var _11,_12,_13;
if(this.Invert){
if(this.Horizontal){
_11=this.Element.offsetWidth;
_12="width";
_13=this.OffsetX;
}else{
_11=this.Element.offsetHeight;
_12="height";
_13=this.OffsetY;
}
this.SetPosition(0);
var _14=Math.max(1,_11-_10)+"px";
this.Element.parentNode.style[_12]=_14;
this.Element.parentNode.style[this.Side]=((_11-_10+_13)*-1)+"px";
}else{
this.Element.style[this.Side]=_10+"px";
}
},OnTick:function(_15){
var _16=Math.round(Penner[this.Tween](_15,this.InitialPosition,this.Delta,this.Ticker.Duration));
if(_16==this.InitialPosition+this.Delta){
this.Ticker.Stop();
return;
}
this.ChangePosition(_16);
this.UpdateContainerSize();
if(this.Overlay){
this.Overlay.Update();
}
},OnTickEnd:function(){
try{
if(this.Direction==0){
return;
}
this.ChangePosition(this.InitialPosition+this.Delta);
if(this.Overlay){
this.Overlay.Update();
}
if(this.Direction>0){
this.Element.parentNode.style.overflow="visible";
if(this.Listener&&this.Listener.OnExpandComplete){
this.Listener.OnExpandComplete();
}
}else{
this.Element.parentNode.style.display="none";
if(this.Listener){
this.Listener.OnCollapseComplete();
}
}
this.Direction=0;
}
catch(e){
}
}};
};var Penner={};
Penner.Linear=function(t,b,c,d){
return c*t/d+b;
};
Penner.InQuad=function(t,b,c,d){
return c*(t/=d)*t+b;
};
Penner.OutQuad=function(t,b,c,d){
return -c*(t/=d)*(t-2)+b;
};
Penner.InOutQuad=function(t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t+b;
}
return -c/2*((--t)*(t-2)-1)+b;
};
Penner.InCubic=function(t,b,c,d){
return c*(t/=d)*t*t+b;
};
Penner.OutCubic=function(t,b,c,d){
return c*((t=t/d-1)*t*t+1)+b;
};
Penner.InOutCubic=function(t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t+b;
}
return c/2*((t-=2)*t*t+2)+b;
};
Penner.InQuart=function(t,b,c,d){
return c*(t/=d)*t*t*t+b;
};
Penner.OutQuart=function(t,b,c,d){
return -c*((t=t/d-1)*t*t*t-1)+b;
};
Penner.InOutQuart=function(t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t+b;
}
return -c/2*((t-=2)*t*t*t-2)+b;
};
Penner.InQuint=function(t,b,c,d){
return c*(t/=d)*t*t*t*t+b;
};
Penner.OutQuint=function(t,b,c,d){
return c*((t=t/d-1)*t*t*t*t+1)+b;
};
Penner.InOutQuint=function(t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t*t+b;
}
return c/2*((t-=2)*t*t*t*t+2)+b;
};
Penner.InSine=function(t,b,c,d){
return -c*Math.cos(t/d*(Math.PI/2))+c+b;
};
Penner.OutSine=function(t,b,c,d){
return c*Math.sin(t/d*(Math.PI/2))+b;
};
Penner.InOutSine=function(t,b,c,d){
return -c/2*(Math.cos(Math.PI*t/d)-1)+b;
};
Penner.InExpo=function(t,b,c,d){
return (t==0)?b:c*Math.pow(2,10*(t/d-1))+b;
};
Penner.OutExpo=function(t,b,c,d){
return (t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;
};
Penner.InOutExpo=function(t,b,c,d){
if(t==0){
return b;
}
if(t==d){
return b+c;
}
if((t/=d/2)<1){
return c/2*Math.pow(2,10*(t-1))+b;
}
return c/2*(-Math.pow(2,-10*--t)+2)+b;
};
Penner.InCirc=function(t,b,c,d){
return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;
};
Penner.OutCirc=function(t,b,c,d){
return c*Math.sqrt(1-(t=t/d-1)*t)+b;
};
Penner.InOutCirc=function(t,b,c,d){
if((t/=d/2)<1){
return -c/2*(Math.sqrt(1-t*t)-1)+b;
}
return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;
};
Penner.InElastic=function(t,b,c,d,a,p){
if(t==0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if((!a)||a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
};
Penner.OutElastic=function(t,b,c,d,a,p){
if(t==0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if((!a)||a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;
};
Penner.InOutElastic=function(t,b,c,d,a,p){
if(t==0){
return b;
}
if((t/=d/2)==2){
return b+c;
}
if(!p){
p=d*(0.3*1.5);
}
if((!a)||a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
if(t<1){
return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;
};
Penner.InBack=function(t,b,c,d,s){
if(s==undefined){
s=1.70158;
}
return c*(t/=d)*t*((s+1)*t-s)+b;
};
Penner.OutBack=function(t,b,c,d,s){
if(s==undefined){
s=1.70158;
}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
};
Penner.InOutBack=function(t,b,c,d,s){
if(s==undefined){
s=1.70158;
}
if((t/=d/2)<1){
return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;
}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
};
Penner.InBounce=function(t,b,c,d){
return c-Penner.OutBounce(d-t,0,c,d)+b;
};
Penner.OutBounce=function(t,b,c,d){
if((t/=d)<(1/2.75)){
return c*(7.5625*t*t)+b;
}else{
if(t<(2/2.75)){
return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
}else{
if(t<(2.5/2.75)){
return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
}else{
return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
}
}
}
};
Penner.InOutBounce=function(t,b,c,d){
if(t<d/2){
return Penner.InBounce(t*2,0,c,d)*0.5+b;
}
return Penner.OutBounce(t*2-d,0,c,d)*0.5+c*0.5+b;
};;if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
if(typeof (window.TSControlsNamespace.EventMixin)=="undefined"||typeof (window.TSControlsNamespace.EventMixin.Version)==null||window.TSControlsNamespace.EventMixin.Version<2){
TSControlsNamespace.EventMixin={Version:2,Initialize:function(_1){
_1._listeners={};
_1._eventsEnabled=true;
_1.AttachEvent=this.AttachEvent;
_1.DetachEvent=this.DetachEvent;
_1.RaiseEvent=this.RaiseEvent;
_1.EnableEvents=this.EnableEvents;
_1.DisableEvents=this.DisableEvents;
_1.DisposeEventHandlers=this.DisposeEventHandlers;
},DisableEvents:function(){
this._eventsEnabled=false;
},EnableEvents:function(){
this._eventsEnabled=true;
},AttachEvent:function(_2,_3){
if(!this._listeners[_2]){
this._listeners[_2]=[];
}
this._listeners[_2][this._listeners[_2].length]=(TSControlsNamespace.EventMixin.ResolveFunction(_3));
},DetachEvent:function(_4,_5){
var _6=this._listeners[_4];
if(!_6){
return false;
}
var _7=TSControlsNamespace.EventMixin.ResolveFunction(_5);
for(var i=0;i<_6.length;i++){
if(_7==_6[i]){
_6.splice(i,1);
return true;
}
}
return false;
},DisposeEventHandlers:function(){
for(var _9 in this._listeners){
var _a=null;
if(this._listeners.hasOwnProperty(_9)){
_a=this._listeners[_9];
for(var i=0;i<_a.length;i++){
_a[i]=null;
}
_a=null;
}
}
},ResolveFunction:function(_c){
if(typeof (_c)=="function"){
return _c;
}else{
if(typeof (window[_c])=="function"){
return window[_c];
}else{
return new Function("var Sender = arguments[0]; var Arguments = arguments[1];"+_c);
}
}
},RaiseEvent:function(_d,_e){
if(!this._eventsEnabled){
return true;
}
var _f=true;
if(this[_d]){
var _10=TSControlsNamespace.EventMixin.ResolveFunction(this[_d])(this,_e);
if(typeof (_10)=="undefined"){
_10=true;
}
_f=_f&&_10;
}
if(!this._listeners[_d]){
return _f;
}
for(var i=0;i<this._listeners[_d].length;i++){
var _12=this._listeners[_d][i];
var _10=_12(this,_e);
if(typeof (_10)=="undefined"){
_10=true;
}
_f=_f&&_10;
}
return _f;
}};
};if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
if(typeof (window.TSControlsNamespace.JSON)=="undefined"||typeof (window.TSControlsNamespace.JSON.Version)==null||window.TSControlsNamespace.JSON.Version<1){
window.TSControlsNamespace.JSON={Version:1,copyright:"(c)2005 JSON.org",license:"http://www.crockford.com/JSON/license.html",stringify:function(v,_2){
var a=[];
var _4=arguments[2]||{};
function e(s){
a[a.length]=s;
}
function g(x){
var c,i,l,v;
switch(typeof x){
case "object":
if(x){
if(x instanceof Array){
e("[");
l=a.length;
for(i=0;i<x.length;i+=1){
v=x[i];
if(typeof v!="undefined"&&typeof v!="function"){
if(l<a.length){
e(",");
}
g(v);
}
}
e("]");
return "";
}else{
if(typeof x.valueOf=="function"){
e("{");
l=a.length;
for(i in x){
v=x[i];
if(_2&&v==_2[i]){
continue;
}
var _a=typeof v;
if(_a=="undefined"||_a=="function"){
continue;
}
if(_a=="object"&&!_4[i]){
continue;
}
if(l<a.length){
e(",");
}
g(i);
e(":");
g(v);
}
return e("}");
}
}
}
e("null");
return "";
case "number":
e(isFinite(x)?+x:"null");
return "";
case "string":
l=x.length;
e("\"");
for(i=0;i<l;i+=1){
c=x.charAt(i);
if(c>=" "){
if(c=="\\"||c=="\""){
e("\\");
}
e(c);
}else{
switch(c){
case "\b":
e("\\b");
break;
case "\f":
e("\\f");
break;
case "\n":
e("\\n");
break;
case "\r":
e("\\r");
break;
case "\t":
e("\\t");
break;
default:
c=c.charCodeAt();
e("\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16));
}
}
}
e("\"");
return "";
case "boolean":
e(String(x));
return "";
default:
e("null");
return "";
}
}
g(v,0);
return a.join("");
},stringifyHashTable:function(_b,_c,_d){
var a=[];
if(!_d){
_d=[];
}
for(var i=0;i<_b.length;i++){
var ser=this.stringify(_b[i],_d[i]);
if(ser=="{}"){
continue;
}
a[a.length]="\""+_b[i][_c]+"\":"+ser;
}
return "{"+a.join(",")+"}";
},parse:function(_11){
return (/^([ \t\r\n,:{}\[\]]|"(\\["\\\/bfnrtu]|[^\x00-\x1f"\\]+)*"|-?\d+(\.\d*)?([eE][+-]?\d+)?|true|false|null)+$/.test(_11))&&eval("("+_11+")");
}};
};if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
if(typeof (window.TSControlsNamespace.Overlay)=="undefined"||typeof (window.TSControlsNamespace.Overlay.Version)==null||window.TSControlsNamespace.Overlay.Version<1.1){
window.TSControlsNamespace.Overlay=function(_1){
if(!this.SupportsOverlay()){
return;
}
this.Element=_1;
this.Shim=document.createElement("IFRAME");
this.Shim.src="javascript:'';";
this.Element.parentNode.insertBefore(this.Shim,this.Element);
if(_1.style.zIndex>0){
this.Shim.style.zIndex=_1.style.zIndex-1;
}
this.Shim.style.position="absolute";
this.Shim.style.border="0px";
this.Shim.frameBorder=0;
this.Shim.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)";
this.Shim.disabled="disabled";
};
window.TSControlsNamespace.Overlay.Version=1.1;
TSControlsNamespace.Overlay.prototype.SupportsOverlay=function(){
return TSControlsNamespace.Browser.IsIE;
};
TSControlsNamespace.Overlay.prototype.Update=function(){
if(!this.SupportsOverlay()){
return;
}
this.Shim.style.top=this.ToUnit(this.Element.style.top);
this.Shim.style.left=this.ToUnit(this.Element.style.left);
this.Shim.style.width=this.Element.offsetWidth+"px";
this.Shim.style.height=this.Element.offsetHeight+"px";
};
TSControlsNamespace.Overlay.prototype.ToUnit=function(_2){
if(!_2){
return "0px";
}
return parseInt(_2)+"px";
};
TSControlsNamespace.Overlay.prototype.Dispose=function(){
if(!this.SupportsOverlay()){
return;
}
if(this.Shim.parentNode){
this.Shim.parentNode.removeChild(this.Shim);
}
this.Element=null;
this.Shim=null;
};
};if(typeof window.TSPanelbarNamespace=="undefined"){
window.TSPanelbarNamespace={};
}
if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
TSControlsNamespace.AppendStyleSheet=function(_1,_2,_3){
if(!_3){
return;
}
var _4=window.netscape&&!window.opera;
if(!_1&&_4){
document.write("<"+"link"+" rel='stylesheet' type='text/css' href='"+_3+"' />");
}else{
var _5=document.createElement("link");
_5.rel="stylesheet";
_5.type="text/css";
_5.href=_3;
document.getElementsByTagName("head")[0].appendChild(_5);
}
};
function TSPanelbar(_6){
var _7=window[_6];
if(_7!=null&&_7.Dispose){
_7.Dispose();
}
this.DomElement=document.getElementById(_6);
this.ChildItemList=TSPanelbar.GetFirstChildByTagName(this.DomElement,"ul");
this.StateField=document.getElementById(_6+"_Hidden");
this.Items=[];
this.AllItems=[];
this.ExpandedItem=null;
this.SelectedItem=null;
this.ExpandAnimation={};
this.CollapseAnimation={};
this.Attributes={};
this.PersistStateInCookie=false;
this.CollapseDelay=0;
this.ExpandDelay=0;
this.ID=_6;
this.CookieName=this.ID;
this.Skin="Outlook";
this.RightToLeft=false;
this.InUpdate=false;
this.Initialized=false;
this.Disposed=false;
this.State={};
this.ItemState={};
this.CausesValidation=true;
this.Enabled=true;
this.FullExpandedItem=false;
this.SingleExpandedItem=false;
this.ExpandMode=TSPanelbar.ExpandMode.MultipleExpandedItems;
TSControlsNamespace.EventMixin.Initialize(this);
TSControlsNamespace.DomEventMixin.Initialize(this);
}
TSPanelbar.JSONIncludeDeep={"Attributes":true};
TSPanelbar.ExpandMode={MultipleExpandedItems:0,SingleExpandedItem:1,FullExpandedItem:2};
TSPanelbar.CreateState=function(_8){
_8.InitialState={};
for(var i in _8){
var _a=typeof _8[i];
if(_a=="number"||_a=="string"||_a=="boolean"){
_8.InitialState[i]=_8[i];
}
}
};
TSPanelbar.GetFirstChildByTagName=function(_b,_c){
var _d=_b.getElementsByTagName(_c)[0];
if(_d&&_d.parentNode==_b){
return _d;
}
return null;
};
TSPanelbar.GetFirstChildByClassName=function(_e,_f){
var _10=_e.childNodes.length;
for(var i=0;i<_10;i++){
var _12=_e.childNodes[i];
if(_12.nodeType==3){
continue;
}
if(_12.className.indexOf(_f)>-1){
return _12;
}
}
return null;
};
TSPanelbar.prototype.RenderInProgress=function(){
return this.DomElement.offsetWidth==0;
};
TSPanelbar.prototype.Initialize=function(_13,_14){
this.LoadConfiguration(_13);
this.ItemData=_14;
this.DetermineDirection();
this.ApplyRTL();
this.CreateControlHierarchy(this,0);
if(!this.Enabled){
this.Disable();
}
this.RegisterDisposeOnUnload();
this.Initialized=true;
TSPanelbar.CreateState(this);
this.AttachEventHandlers();
this.RaiseEvent("OnClientLoad",null);
};
TSPanelbar.prototype.AttachEventHandlers=function(){
this.AttachDomEvent(window,"resize","WindowResizeHandler");
var _15=this;
this.DomElement.TSShow=function(){
_15.ResizeHandler();
};
this.DomElement.TSResize=function(){
_15.WindowResizeHandler();
};
};
TSPanelbar.prototype.WindowResizeHandler=function(){
this.ResizeHandler();
this.CallTSResize();
};
TSPanelbar.prototype.CallTSResize=function(){
var _16=this.ChildItemList.getElementsByTagName("*");
for(var i=0,_18=_16.length;i<_18;i++){
var _19=_16[i];
if(_19.TSResize){
_19.TSResize();
}
}
};
TSPanelbar.prototype.ResizeHandler=function(){
if(this.Disposed){
return;
}
if(this.ExpandedItem){
if(this.FullExpandedItem&&!this.ExpandedItem.EaseInProgress){
this.ExpandedItem.SetChildrenHeight(this.GetGroupHeight());
}
}
};
TSPanelbar.prototype.GetGroupHeight=function(){
if(this.ExpandedItem){
this.ExpandedItem.AnimationContainer.style.display="none";
this.ExpandedItem.ChildItemList.style.display="none";
}
var _1a=this.DomElement.offsetHeight-this.ChildItemList.offsetHeight;
if(this.ExpandedItem){
this.ExpandedItem.AnimationContainer.style.display="block";
this.ExpandedItem.ChildItemList.style.display="block";
}
return _1a;
};
TSPanelbar.prototype.GetContentsHeight=function(){
var sum=0;
for(var i=0;i<this.AllItems.length;i++){
sum+=this.AllItems[i].GetHeight();
}
return sum;
};
TSPanelbar.prototype.RegisterDisposeOnUnload=function(){
this.AttachDomEvent(window,"unload","Dispose");
};
TSPanelbar.prototype.DetermineDirection=function(){
var el=this.DomElement;
while(el.tagName.toLowerCase()!="html"){
if(el.dir){
this.RightToLeft=(el.dir.toLowerCase()=="rtl");
return;
}
el=el.parentNode;
}
this.RightToLeft=false;
};
TSPanelbar.prototype.ApplyRTL=function(){
if(!this.RightToLeft){
return;
}
this.DomElement.className+=" rtl TSPanelbar_"+this.Skin+"_rtl";
};
TSPanelbar.prototype.Disable=function(){
this.Enabled=false;
this.DomElement.disabled="disabled";
for(var i=0;i<this.AllItems.length;i++){
this.AllItems[i].Disable();
}
};
TSPanelbar.prototype.Enable=function(){
this.Enabled=true;
this.DomElement.disabled="";
for(var i=0;i<this.AllItems.length;i++){
this.AllItems[i].Enable();
}
};
TSPanelbar.prototype.Dispose=function(){
this.Disposed=true;
this.DisposeDomEventHandlers();
for(var i=0;i<this.AllItems.length;i++){
this.AllItems[i].Dispose();
}
if(this.DomElement){
this.DomElement.TSShow=null;
this.DomElement.TSResize=null;
}
this.StateField=null;
this.DomElement=null;
this.ChildItemList=null;
};
TSPanelbarNamespace.ExpandDirectionPropertyName={"1":"bottom","2":"top","3":"right","4":"left"};
TSPanelbar.prototype.CreatePanelItem=function(_21,_22){
var _23=new TSPanelItem(_22);
_23.Index=_21.Items.length;
_21.Items[_21.Items.length]=_23;
_23.GlobalIndex=this.AllItems.length;
this.AllItems[this.AllItems.length]=_23;
_23.Parent=_21;
_23.Panelbar=this;
return _23;
};
TSPanelbar.prototype.CreateControlHierarchy=function(_24,_25){
var _26=_24.ChildItemList;
if(!_26){
return;
}
for(var i=0;i<_26.childNodes.length;i++){
var _28=_26.childNodes[i];
if(_28.nodeType==3){
continue;
}
var _29=this.CreatePanelItem(_24,_28);
_29.Level=_25+1;
_29.Initialize();
this.CreateControlHierarchy(_29,_25+1);
_29.ApplyStates();
}
};
TSPanelbar.prototype.LoadConfiguration=function(_2a){
for(var _2b in _2a){
this[_2b]=_2a[_2b];
}
var _2c=TSPanelbar.ExpandMode;
this.FullExpandedItem=this.ExpandMode==_2c.FullExpandedItem;
this.SingleExpandedItem=this.ExpandMode==_2c.FullExpandedItem||this.ExpandMode==_2c.SingleExpandedItem;
if(this.FullExpandedItem){
this.DomElement.style.overflow="hidden";
}
};
TSPanelbar.prototype.FindItemByText=function(_2d){
for(var i=0;i<this.AllItems.length;i++){
if(this.AllItems[i].Text==_2d){
return this.AllItems[i];
}
}
return null;
};
TSPanelbar.prototype.FindItemById=function(id){
for(var i=0;i<this.AllItems.length;i++){
if(this.AllItems[i].ID==id){
return this.AllItems[i];
}
}
return null;
};
TSPanelbar.prototype.FindItemByValue=function(_31){
for(var i=0;i<this.AllItems.length;i++){
if(this.AllItems[i].Value==_31){
return this.AllItems[i];
}
}
return null;
};
TSPanelbar.prototype.FindItemByUrl=function(url){
for(var i=0;i<this.AllItems.length;i++){
if(this.AllItems[i].NavigateUrl==url){
return this.AllItems[i];
}
}
return null;
};
TSPanelbar.prototype.RecordState=function(){
if(this.InUpdate||!this.Initialized){
return;
}
this.InitialState.Clicked=this.Clicked;
var _35=TSControlsNamespace.JSON.stringify(this,this.InitialState,TSPanelbar.JSONIncludeDeep);
var _36=[];
for(var i in this.ItemState){
if(this.ItemState[i]==""){
continue;
}
if(typeof this.ItemState[i]=="function"){
continue;
}
_36[_36.length]=this.ItemState[i];
}
this.StateField.value="{\"State\":"+_35+",\"ItemState\":{"+_36.join(",")+"}}";
if(this.PersistStateInCookie){
this.PersistState();
}
};
TSPanelbar.prototype.SetAttribute=function(_38,_39){
this.Attributes[_38]=_39;
this.RecordState();
};
TSPanelbar.prototype.GetAttribute=function(_3a){
return this.Attributes[_3a];
};
TSPanelbar.prototype.IsChildOf=function(_3b,_3c){
if(_3c==_3b){
return false;
}
while(_3c&&(_3c!=document.body)){
if(_3c==_3b){
return true;
}
try{
_3c=_3c.parentNode;
}
catch(e){
return false;
}
}
return false;
};
TSPanelbar.prototype.PersistState=function(){
var _3d=[];
for(var i=0;i<this.AllItems.length;i++){
var _3f=this.AllItems[i];
if(_3f.Expanded){
_3d[_3d.length]=_3f.ID;
}
}
var _40="{";
if(this.SelectedItem){
_40+="\"SelectedItem\":\""+this.SelectedItem.ID+"\",";
}
_40+="\"ExpandedItems\":\""+_3d.join(",")+"\"}";
document.cookie=this.CookieName+"="+_40+";path=/;expires=";
};;function TSPanelItem(_1){
this.DomElement=_1;
this.LinkElement=TSPanelbar.GetFirstChildByTagName(this.DomElement,"a");
if(this.LinkElement==null){
this.ID=this.DomElement.id;
this.TextElement=TSPanelbar.GetFirstChildByTagName(this.DomElement,"span");
this.NavigateUrl="";
}else{
this.ID=this.LinkElement.id;
this.TextElement=TSPanelbar.GetFirstChildByTagName(this.LinkElement,"span");
this.NavigateUrl=this.LinkElement.href;
}
this.IsSeparator=false;
this.AnimationContainer=null;
this.ExpandedItem=null;
this.FocusedItem=null;
this.Items=[];
this.Attributes={};
this.Index=-1;
this.Level=-1;
this.Parent=null;
this.Panelbar=null;
this.TimeoutPointer=null;
this.Templated=false;
this.NavigateAfterClick=true;
this.FocusedCssClass="focused";
this.SelectedCssClass="selected";
this.ClickedCssClass="clicked";
this.ExpandedCssClass="expanded";
this.DisabledCssClass="disabled";
this.CssClass="";
this.Focused=false;
this.Clicked=false;
this.Enabled=true;
this.Expanded=false;
this.EaseInProgress=false;
this.Initialized=false;
this.ImageOverUrl="";
this.ExpandedImageUrl="";
this.DisabledImageUrl="";
}
TSPanelItem.prototype.SetText=function(_2){
this.TextElement.innerHTML=_2;
this.Text=_2;
this.RecordState();
};
TSPanelItem.prototype.SetValue=function(_3){
this.Value=_3;
this.RecordState();
};
TSPanelItem.prototype.GetHeight=function(){
return this.Parent.Expanded||this.Parent==this.Panelbar?this.LinkElement.offsetHeight:0;
};
TSPanelItem.prototype.InitializeDomElements=function(){
this.AnimationContainer=TSPanelbar.GetFirstChildByClassName(this.DomElement,"slide");
this.ImageElement=TSPanelbar.GetFirstChildByTagName(this.LinkElement||this.DomElement,"img");
if(this.ImageElement){
this.ImageUrl=this.ImageElement.src;
}
if(this.AnimationContainer){
var ul=this.AnimationContainer.getElementsByTagName("ul")[0];
this.ChildItemList=ul;
}
};
TSPanelItem.prototype.Initialize=function(){
TSControlsNamespace.DomEventMixin.Initialize(this);
this.LoadConfiguration();
this.InitializeDomElements();
if(this.AnimationContainer){
this.Ease=new TSControlsNamespace.Ease(this.ChildItemList,this.Panelbar,0,0,this);
this.Ease.SlideParent=true;
var _5="down";
var _6=TSPanelbarNamespace.ExpandDirectionPropertyName[_5];
this.Ease.SetSide("top");
this.AnimationContainer.style.zIndex=this.GlobalIndex+10;
this.ChildItemList.style.zIndex=this.GlobalIndex+10;
}
if(this.TextElement&&this.TextElement.firstChild){
this.Text=this.TextElement.firstChild.nodeValue;
}
this.OriginalZIndex=this.DomElement.style.zIndex;
this.AttachEventHandlers();
this.RenderAccessKey();
this.Initialized=true;
TSPanelbar.CreateState(this);
this.UpdateCssClass();
};
TSPanelItem.prototype.RenderAccessKey=function(){
if(this.IsSeparator||!this.LinkElement){
return;
}
var _7=this.LinkElement.accessKey.toLowerCase();
if(!_7){
return;
}
var _8=this.TextElement.firstChild.nodeValue;
var _9=_8.toLowerCase().indexOf(_7);
if(_9==-1){
return;
}
this.TextElement.innerHTML=_8.substr(0,_9)+"<u>"+_8.substr(_9,1)+"</u>"+_8.substr(_9+1,_8.length);
};
TSPanelItem.prototype.Dispose=function(){
if(!this.Initialized){
return;
}
this.DisposeDomEventHandlers();
if(this.Ease){
this.Ease.Dispose();
}
if(this.DomElement){
this.DomElement.TSShow=null;
}
this.DomElement=null;
this.LinkElement=null;
this.ChildItemList=null;
this.TextElement=null;
this.ImageElement=null;
this.AnimationContainer=null;
};
TSPanelItem.prototype.Focus=function(){
if(!this.CanFocus()){
return;
}
if((!this.Parent.Expanded)&&this.Parent.Expand){
this.Parent.Expand();
}
this.Parent.FocusedItem=this;
if(!this.Focused&&this.LinkElement){
this.LinkElement.focus();
}
this.UpdateCssClass();
this.RaiseEvent("OnClientItemFocus");
};
TSPanelItem.prototype.Blur=function(){
if(this.IsSeparator){
return;
}
if(this.Focused){
this.LinkElement.blur();
}
this.Parent.FocusedItem=null;
this.UpdateCssClass();
this.RaiseEvent("OnClientItemBlur");
};
TSPanelItem.prototype.SetChildrenHeight=function(_a){
if(_a<0){
_a=0;
}
if(!_a==""){
_a+="px";
}
this.ChildItemList.style.height=_a;
this.AnimationContainer.style.height=_a;
};
TSPanelItem.prototype.InstantExpand=function(){
if(!this.Ease){
return;
}
var _b=this.Ease.ExpandConfig.Type;
this.Ease.ExpandConfig.Type="None";
this.Expand();
this.Ease.ExpandConfig.Type=_b;
};
TSPanelItem.prototype.Expand=function(){
if(!this.Items.length){
return;
}
if(this.Expanded){
return;
}
if(this.Level==1&&this.Panelbar.FullExpandedItem){
this.ChildItemList.style.height=this.Panelbar.GetGroupHeight()+"px";
}
this.ChildItemList.style.display="none";
this.ChildItemList.style.width="100%";
if(this.Level>1&&!this.Panelbar.FullExpandedItem){
this.Parent.SetChildrenHeight("");
}
if(this.Parent.ExpandedItem&&this.Panelbar.SingleExpandedItem){
this.Parent.ExpandedItem.Collapse();
}
this.Parent.ExpandedItem=this;
this.Panelbar.LastExpandedItem=this;
this.Expanded=true;
var _c=TSControlsNamespace.Screen.GetViewPortSize();
this.ChildItemList.style.display="block";
this.Ease.ShowElements();
this.Ease.SetSide("top");
this.EaseInProgress=true;
this.Ease.In();
this.UpdateCssClass();
this.RecordState();
this.RaiseEvent("OnClientItemExpand");
this.CallTSShow();
};
TSPanelItem.prototype.CallTSShow=function(){
var _d=this.ChildItemList.getElementsByTagName("*");
for(var i=0,_f=_d.length;i<_f;i++){
var _10=_d[i];
if(_10.TSShow){
_10.TSShow();
}
}
};
TSPanelItem.prototype.RaiseEvent=function(_11){
return this.Panelbar.RaiseEvent(_11,{Item:this});
};
TSPanelItem.prototype.UpdateCssClass=function(){
if(this.IsSeparator||!this.LinkElement){
return;
}
var _12="link "+this.CssClass;
if(this.Focused){
_12=_12+" "+this.FocusedCssClass;
}
if(this.Selected){
_12=_12+" "+this.SelectedCssClass;
}
if(this.Expanded){
_12=_12+" "+this.ExpandedCssClass;
}
if(this.Clicked){
_12=_12+" "+this.ClickedCssClass;
}
if(!this.Enabled){
_12=_12+" "+this.DisabledCssClass;
}
this.LinkElement.className=_12;
this.UpdateImageUrl();
};
TSPanelItem.prototype.UpdateImageUrl=function(){
if(!this.ImageElement){
return;
}
var _13=this.ImageUrl;
if(this.Hovered&&this.ImageOverUrl){
_13=this.ImageOverUrl;
}
if(this.Selected&&this.SelectedImageUrl){
_13=this.SelectedImageUrl;
}
if(this.Expanded&&this.ExpandedImageUrl){
_13=this.ExpandedImageUrl;
}
if(!this.Enabled&&this.DisabledImageUrl){
_13=this.DisabledImageUrl;
}
_13=_13.replace(/&amp;/ig,"&");
if(_13!=this.ImageElement.src){
this.ImageElement.src=_13;
}
};
TSPanelItem.prototype.Enable=function(){
if(this.IsSeparator){
return;
}
this.LinkElement.disabled="";
this.Enabled=true;
this.EnableDomEventHandling();
this.UpdateCssClass();
};
TSPanelItem.prototype.Disable=function(){
if(this.IsSeparator){
return;
}
if(this.LinkElement){
this.LinkElement.disabled="disabled";
}
this.Enabled=false;
this.DisableDomEventHandling();
this.UpdateCssClass();
};
TSPanelItem.prototype.Collapse=function(){
if(!this.Items.length){
return;
}
if(this.IsSeparator){
return;
}
if(!this.Expanded){
return;
}
this.Parent.ExpandedItem=null;
this.Parent.LastExpandedItem=this.Parent;
this.Expanded=false;
if(this.Level>1&&!this.Panelbar.FullExpandedItem){
this.Parent.SetChildrenHeight("");
}
this.EaseInProgress=true;
this.Ease.Out();
this.UpdateCssClass();
this.RecordState();
this.RaiseEvent("OnClientItemCollapse");
};
TSPanelItem.prototype.OnCollapseComplete=function(){
this.EaseInProgress=false;
};
TSPanelItem.prototype.OnExpandComplete=function(){
this.EaseInProgress=false;
this.AnimationContainer.style.height="auto";
};
TSPanelItem.prototype.Select=function(){
if(this.Selected){
return;
}
if(this.Panelbar.SelectedItem){
this.Panelbar.SelectedItem.UnSelect();
}
this.Panelbar.SelectedItem=this;
this.Selected=true;
this.RecordState();
this.UpdateCssClass();
};
TSPanelItem.prototype.UnSelect=function(){
if(!this.Selected){
return;
}
this.Panelbar.SelectedItem=null;
this.Selected=false;
this.RecordState();
this.UpdateCssClass();
};
TSPanelItem.prototype.AttachEventHandlers=function(){
if(this.IsSeparator||!this.LinkElement){
return;
}
this.AttachDomEvent(this.LinkElement,"mouseout","HRefMouseOutHandler");
this.AttachDomEvent(this.LinkElement,"mouseover","HRefMouseOverHandler");
this.AttachDomEvent(this.LinkElement,"click","ClickHandler",true);
this.AttachDomEvent(this.LinkElement,"mousedown","MouseDownHandler");
this.AttachDomEvent(this.LinkElement,"mouseup","MouseUpHandler");
this.AttachDomEvent(this.LinkElement,"blur","BlurHandler");
this.AttachDomEvent(this.LinkElement,"focus","FocusHandler");
this.AttachDomEvent(this.LinkElement,"contextmenu","ContextMenuHandler");
this.AttachDomEvent(this.LinkElement,"keydown","KeyDownHandler");
this.AttachDomEvent(window,"load","WindowLoadHandler");
var _14=this;
this.DomElement.TSShow=function(){
_14.WindowLoadHandler();
};
};
TSPanelItem.prototype.ContextMenuHandler=function(e){
if(!this.Panelbar.RaiseEvent("OnClientContextMenu",{Item:this,EventObject:e})){
return TSControlsNamespace.DomEvent.PreventDefault(e);
}
};
TSPanelItem.prototype.WindowLoadHandler=function(e){
if(this.Panelbar.RenderInProgress()){
return;
}
if(this.LoadHandlerExecuted){
return;
}
this.LoadHandlerExecuted=true;
if(this.Expanded){
this.Expanded=false;
this.Parent.ExpandedItem=this;
this.InstantExpand();
}
};
TSPanelItem.prototype.MouseDownHandler=function(e){
this.Clicked=true;
this.UpdateCssClass();
};
TSPanelItem.prototype.MouseUpHandler=function(e){
this.Clicked=false;
this.UpdateCssClass();
};
TSPanelItem.prototype.HRefMouseOutHandler=function(e){
var to=TSControlsNamespace.DomEvent.GetRelatedTarget(e);
if(this.Panelbar.IsChildOf(this.LinkElement,to)||to==this.LinkElement){
return;
}
this.Hovered=false;
this.UpdateCssClass();
this.RaiseEvent("OnClientMouseOut");
};
TSPanelItem.prototype.HRefMouseOverHandler=function(e){
var _1c=TSControlsNamespace.DomEvent.GetRelatedTarget(e);
if(this.Panelbar.IsChildOf(this.LinkElement,_1c)||this.LinkElement==_1c){
return;
}
this.Hovered=true;
this.UpdateCssClass();
this.RaiseEvent("OnClientMouseOver");
};
TSPanelItem.prototype.KeyDownHandler=function(e){
var _1e={left:37,up:38,right:39,down:40,esc:27};
var _1f=TSControlsNamespace.DomEvent.GetKeyCode(e);
if(_1f==_1e.up){
this.HandleUpArrow();
}else{
if(_1f==_1e.down){
this.HandleDownArrow();
}else{
if(_1f==_1e.esc){
this.Parent.Focus();
}else{
return;
}
}
}
TSControlsNamespace.DomEvent.PreventDefault(e);
};
TSPanelItem.prototype.FocusHandler=function(e){
this.Focused=true;
this.Focus();
};
TSPanelItem.prototype.BlurHandler=function(e){
this.Focused=false;
this.Panelbar.Clicked=false;
this.Blur();
};
TSPanelItem.prototype.NavigatesToURL=function(){
if(location.href+"#"==this.NavigateUrl||location.href==this.NavigateUrl){
return false;
}
return (new RegExp("//")).test(this.LinkElement.href);
};
TSPanelItem.prototype.Validate=function(){
if(!this.Panelbar.CausesValidation||this.NavigatesToURL()){
return true;
}
if(typeof (Page_ClientValidate)!="function"){
return true;
}
return Page_ClientValidate(this.Panelbar.ValidationGroup);
};
TSPanelItem.prototype.ClickHandler=function(e){
if(!this.Enabled){
TSControlsNamespace.DomEvent.PreventDefault(e);
return false;
}
if(!this.RaiseEvent("OnClientItemClicking")){
TSControlsNamespace.DomEvent.PreventDefault(e);
return false;
}
if(!this.Validate()){
return false;
}
var _23=this.LinkElement.href.indexOf("javascript:")==0;
if(this.NavigateAfterClick&&!_23){
if(this.Panelbar.SingleExpandedItem){
if(this.Parent.ExpandedItem){
this.Parent.ExpandedItem.Expanded=false;
this.Parent.ExpandedItem.RecordState();
}
if(this.Items.length){
this.Expanded=true;
}
}else{
if(this.Items.length){
this.Expanded=!this.Expanded;
}
}
if(this.LinkElement.target&&this.LinkElement.target!="_self"){
this.Select();
}else{
if(this.Panelbar.SelectedItem){
this.Panelbar.SelectedItem.Selected=false;
this.Panelbar.SelectedItem.RecordState();
}
this.Panelbar.SelectedItem=this;
this.Selected=true;
this.RecordState();
}
this.RaiseEvent("OnClientItemClicked");
return true;
}
if(this.Panelbar.SingleExpandedItem){
if(!this.Expanded){
this.Expand();
}
}else{
this.Expanded?this.Collapse():this.Expand();
}
this.Select();
this.RaiseEvent("OnClientItemClicked");
if(_23){
return true;
}
TSControlsNamespace.DomEvent.PreventDefault(e);
return false;
};
TSPanelItem.prototype.SetContainerPosition=function(_24,top){
this.AnimationContainer.style.top=(top+this.GroupSettings.OffsetY)+"px";
this.AnimationContainer.style.left=(_24+this.GroupSettings.OffsetX)+"px";
};
TSPanelItem.prototype.SetAttribute=function(_26,_27){
this.Attributes[_26]=_27;
this.RecordState();
};
TSPanelItem.prototype.SetImageUrl=function(src){
this.ImageUrl=src;
this.UpdateCssClass();
this.RecordState();
};
TSPanelItem.prototype.SetImageOverUrl=function(src){
this.ImageOverUrl=src;
this.UpdateCssClass();
this.RecordState();
};
TSPanelItem.prototype.GetAttribute=function(_2a){
return this.Attributes[_2a];
};
TSPanelItem.prototype.LoadConfiguration=function(){
if(this.Panelbar.ItemData[this.ID]){
for(var _2b in this.Panelbar.ItemData[this.ID]){
this[_2b]=this.Panelbar.ItemData[this.ID][_2b];
}
}
};
TSPanelItem.prototype.ApplyStates=function(){
if(!this.Enabled){
this.Disable();
}
if(this.Selected){
this.Selected=false;
this.Select();
}
this.WindowLoadHandler();
};
TSPanelItem.prototype.HandleRightArrow=function(){
};
TSPanelItem.prototype.HandleLeftArrow=function(){
};
TSPanelItem.prototype.HandleUpArrow=function(){
this.Index||!this.Parent.Focus?this.FocusPreviousItem():this.Parent.Focus();
};
TSPanelItem.prototype.HandleDownArrow=function(){
if(this.Expanded){
this.FocusFirstChild();
return;
}
var _2c=this.Index==this.Parent.Items.length-1;
if(_2c&&this.Parent.Focus){
this.Parent.FocusNextItem();
}else{
this.FocusNextItem();
}
};
TSPanelItem.prototype.GetNextItem=function(){
if(this.Index==this.Parent.Items.length-1){
return this.Parent.Items[0];
}
return this.Parent.Items[this.Index+1];
};
TSPanelItem.prototype.GetPreviousItem=function(){
if(this.Index==0){
return this.Parent.Items[this.Parent.Items.length-1];
}
return this.Parent.Items[this.Index-1];
};
TSPanelItem.prototype.CanFocus=function(){
return (!this.IsSeparator)&&this.Enabled;
};
TSPanelItem.prototype.FocusFirstChild=function(){
if(!this.Items.length){
return;
}
var _2d=this.Items[0];
while(!_2d.CanFocus()){
_2d=_2d.GetNextItem();
if(_2d==this.Items[0]){
return;
}
}
_2d.Focus();
};
TSPanelItem.prototype.FocusLastChild=function(){
if(!this.Items.length){
return;
}
var _2e=this.Items[this.Items.length-1];
while(!_2e.CanFocus()){
_2e=_2e.GetPreviousItem();
if(this.Items.length-1){
return;
}
}
_2e.Focus();
};
TSPanelItem.prototype.FocusNextItem=function(){
var _2f=this.GetNextItem();
while(!_2f.CanFocus()){
_2f=_2f.GetNextItem();
}
_2f.Focus();
};
TSPanelItem.prototype.FocusPreviousItem=function(){
var _30=this.GetPreviousItem();
while(!_30.CanFocus()){
_30=_30.GetPreviousItem();
}
_30.Focus();
};
TSPanelItem.prototype.RecordState=function(){
this.InitialState.EaseInProgress=this.EaseInProgress;
var _31=TSControlsNamespace.JSON.stringify(this,this.InitialState,TSPanelbar.JSONIncludeDeep);
if(_31=="{}"){
this.Panelbar.ItemState[this.ID]="";
}else{
this.Panelbar.ItemState[this.ID]="\""+this.ID+"\":"+_31;
}
this.Panelbar.RecordState();
};;if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
if(typeof (window.TSControlsNamespace.Screen)=="undefined"||typeof (window.TSControlsNamespace.Screen.Version)==null||window.TSControlsNamespace.Screen.Version<1.1){
window.TSControlsNamespace.Screen={Version:1.1,GetViewPortSize:function(){
var _1=0;
var _2=0;
var _3=document.body;
if(TSControlsNamespace.Browser.StandardsMode&&!TSControlsNamespace.Browser.IsSafari){
_3=document.documentElement;
}
if(TSControlsNamespace.Browser.IsMozilla&&document.compatMode!="CSS1Compat"){
_3=document.body;
}
if(window.innerWidth){
_1=window.innerWidth;
_2=window.innerHeight;
}else{
_1=_3.clientWidth;
_2=_3.clientHeight;
}
_1+=_3.scrollLeft;
_2+=_3.scrollTop;
return {width:_1-6,height:_2-6};
},GetElementPosition:function(el){
var _5=null;
var _6={x:0,y:0};
var _7;
if(el.getBoundingClientRect){
_7=el.getBoundingClientRect();
var _8=document.documentElement.scrollTop||document.body.scrollTop;
var _9=document.documentElement.scrollLeft||document.body.scrollLeft;
_6.x=_7.left+_9-2;
_6.y=_7.top+_8-2;
return _6;
}else{
if(document.getBoxObjectFor){
try{
_7=document.getBoxObjectFor(el);
_6.x=_7.x-2;
_6.y=_7.y-2;
}
catch(e){
}
}else{
_6.x=el.offsetLeft;
_6.y=el.offsetTop;
_5=el.offsetParent;
if(_5!=el){
while(_5){
_6.x+=_5.offsetLeft;
_6.y+=_5.offsetTop;
_5=_5.offsetParent;
}
}
}
}
if(window.opera){
_5=el.offsetParent;
while(_5&&_5.tagName!="BODY"&&_5.tagName!="HTML"){
_6.x-=_5.scrollLeft;
_6.y-=_5.scrollTop;
_5=_5.offsetParent;
}
}else{
_5=el.parentNode;
while(_5&&_5.tagName!="BODY"&&_5.tagName!="HTML"){
_6.x-=_5.scrollLeft;
_6.y-=_5.scrollTop;
_5=_5.parentNode;
}
}
return _6;
},ElementOverflowsTop:function(_a){
return this.GetElementPosition(_a).y<0;
},ElementOverflowsLeft:function(_b){
return this.GetElementPosition(_b).x<0;
},ElementOverflowsBottom:function(_c,_d){
var _e=this.GetElementPosition(_d).y+TSControlsNamespace.Box.GetOuterHeight(_d);
return _e>_c.height;
},ElementOverflowsRight:function(_f,_10){
var _11=this.GetElementPosition(_10).x+TSControlsNamespace.Box.GetOuterWidth(_10);
return _11>_f.width;
}};
};if(typeof window.TSControlsNamespace=="undefined"){
window.TSControlsNamespace={};
}
TSControlsNamespace.Ticker=function(_1){
this.Listener=_1;
this.IntervalPointer=null;
};
TSControlsNamespace.Ticker.prototype={Configure:function(_2){
this.Duration=_2.Duration;
this.Interval=16;
},Start:function(){
clearInterval(this.IntervalPointer);
this.TimeElapsed=0;
var _3=this;
var _4=function(){
_3.Tick();
};
this.Tick();
this.IntervalPointer=setInterval(_4,this.Interval);
},Tick:function(){
this.TimeElapsed+=this.Interval;
this.Listener.OnTick(this.TimeElapsed);
if(this.TimeElapsed>=this.Duration){
this.Stop();
}
},Stop:function(){
if(this.IntervalPointer){
this.Listener.OnTickEnd();
clearInterval(this.IntervalPointer);
this.IntervalPointer=null;
}
}};;//BEGIN_ATLAS_NOTIFY
if (typeof(Sys) != "undefined"){if (Sys.Application != null && Sys.Application.notifyScriptLoaded != null){Sys.Application.notifyScriptLoaded();}}
//END_ATLAS_NOTIFY
