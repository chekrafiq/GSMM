Sys.Application.add_load(ApplicationLoadHandler);

                  
var lastPostBackElement = null;

__FCKeditorNS = null;
FCKeditorAPI = null;

function tvset(tv, txt) {
    var $checkedNodes='';
    $('#' + tv + ' :checked').each(function () {
        var $this = $(this);
        $checkedNodes = $checkedNodes + ';'
    });
    $('#'+ txt).value = $checkedNodes;
}

var i18n = (function i18n() {           
        var ltrChars            = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
            rtlChars            = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
            ltrDirCheckRe       = new RegExp('^[^'+rtlChars+']*['+ltrChars+']'),
            rtlDirCheckRe       = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');

        // Inbuilt addEvent function
        function addEvent(obj, type, fn, tmp) {
                tmp || (tmp = true);
                if( obj.attachEvent ) {
                        obj["e"+type+fn] = fn;
                        obj[type+fn] = function(){obj["e"+type+fn]( window.event );};
                        obj.attachEvent( "on"+type, obj[type+fn] );
                } else {
                        obj.addEventListener( type, fn, true );
                };
        };
        
        function addElemEvents(elemId) {
            var elem = document.getElementById(elemId);
            if(elem){
            if (elem.tagName == 'INPUT') {
                addEvent(elem, "keydown", check);
                addEvent(elem, "keyup",   check);
            }
            checkDirection(elem);
            }
        };
        
        function check(e) {
                checkDirection(this);
        };
        
        function checkDirection(elem) {
                var text = (elem.tagName == 'INPUT') ? elem.value : elem.innerText;
                elem.dir = isRtlText(text) ? 'rtl' : (isLtrText(text) ? 'ltr' : '');
                elem.style.textAlign = (elem.dir=='ltr') ? 'left' : (elem.dir=='rtl') ? 'right' : '';  
        };
        
        function isRtlText(text) {
                return rtlDirCheckRe.test(text);
        };
        
        function isLtrText(text) {
                return ltrDirCheckRe.test(text);
        };
        
        return {
                addElements: function(elems) {
                        if(!elems.length) elems = [elems];
                        for(var i = 0, elem; elem = elems[i]; i++) {                                  
                                addElemEvents(elem);                                  
                        };
                }
        };
})();


function cmd(lnk,arg)
{
    if(arg==null||arg=='')
        __doPostBack('cmd',lnk);
    else
        __doPostBack('cmd',lnk+'('+arg+')');
}
function refresh()
{
    __doPostBack('cmd', '');
}

function ApplicationLoadHandler(sender, args)
{
    
    if ($.fn.jquery != '1.9.1') {
        $.noConflict();
    }

    Shadowbox.init({
        animate: true,
        displayNav:true
    });
    Shadowbox.setup();

        
      Sys.WebForms.PageRequestManager.getInstance().add_initializeRequest(InitializeRequest);
      Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(beginRequest);
      Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
      Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(pageLoaded);      
   
}


function applicationUnloadHandler() {
    lastPostBackElement = null;
    Sys.Application.dispose();
};

function InitializeRequest(sender, args)
{ 
    var prm = Sys.WebForms.PageRequestManager.getInstance();
    if (prm.get_isInAsyncPostBack()) 
    {
        if (lastPostBackElement === args.get_postBackElement().id)
            args.set_cancel(true);
        else
        {            
            prm.abortPostBack();
            lastPostBackElement = args.get_postBackElement().id;
        }
    }
    else
        lastPostBackElement = args.get_postBackElement().id;
}


function beginRequest(sender, args) 
{
    $("body").addClass("loading");
}



function EndRequestHandler(sender, args)
{    
   
    $("body").removeClass("loading");

  
   if (args.get_error() != undefined)
   {
       
       var errorMessage;
       if (args.get_response().get_timedOut()) 
       {
            errorMessage = 'Délai d\'attente expiré. ';
       }
       else
       {
            if (args.get_error().name == 'Sys.WebForms.PageRequestManagerParserErrorException')
            {
                window.location.reload();    
            }
            else
            {
               if (args.get_response().get_statusCode() == '200')
               {
                   errorMessage = args.get_error().message;
               }
               else
               {
                   errorMessage = 'Une erreur non spécifiée s\'est produite. ';
               }
             } 
             
       }
       
       args.set_errorHandled(true);
       
       
       if (errorMessage) {
           $('#errDiv').html(errorMessage);
           $('#errDiv').dialog('open');
       }
          

   }

  
 
}

$(function() {
    $('#errDiv').dialog({
        autoOpen: false,
        width: 400,
        title:'Erreur',
        buttons: {
            Ok: function () { $(this).dialog('close'); }
        }
    });
});



function pageLoaded(sender, args)
{
    lastPostBackElement = null;
}





 function  printEdt(el, cssName)  
{   
      var printIframe = document.createElement("IFRAME");   
      document.body.appendChild(printIframe);   
      var printDocument = printIframe.contentWindow.document;   
      printDocument.designMode = "on";   
      printDocument.open();   
      var currentLocation = document.location.href;   
      currentLocation = currentLocation.substring(0, currentLocation.lastIndexOf("/") + 1);   
      
      //var editor = document.getElementById(editorID);
      printDocument.write( "<html><head></head><body>" + el.innerHTML+  "</body></html>");   
      printDocument.close();   

      try   
      {   
        if (document.all)   
        {   
           var oLink = printDocument.createElement("link");   
           oLink.setAttribute("href", currentLocation + cssName, 0);   
           oLink.setAttribute("type", "text/css");   
           oLink.setAttribute("rel", "stylesheet", 0);   
           printDocument.getElementsByTagName("head")[0].appendChild(oLink);   
           printDocument.execCommand("Print");   
        }   
        else   
        {   
           printDocument.body.innerHTML = "<link rel='stylesheet' type='text/css' href='" + currentLocation + cssName + "'></link>" + printDocument.body.innerHTML;
           printIframe.contentWindow. print();   
        }   
      }   
      catch(ex)   
      {   

      }   
      document.body.removeChild(printIframe);
      return false;  
}

function Submit(id, e) 
{
    var isEnter = window.event == null ? e.keyCode == 13 : window.event.keyCode == 13;
    if(isEnter)
    {
        document.getElementById(id).click();
        return false;
    }   
    else
        return true;
}


(function ($) {
    $.fn.Watermark = function (o) {
        return this.each(function () {
            if (typeof (o) == "string")
                try { o = eval("(" + o + ")"); } catch (ex) { o = { html: o }; };
            var input = $(this);
            o = $.extend({
                html: input.attr("title"),
                color: input[0].style.color || "#ccc",
                cursor: input[0].style.cursor || "text"
            }, o);
            var lbl = $("<label/>");
            lbl.html(o.html);
            lbl.css({ position: "absolute", color: o.color, cursor: o.cursor });
            if (o.cls) lbl.addClass(o.cls);
            if (o.css) lbl.css(o.css);
            $.each(["font-size", "font", "font-weight"], function (v, n) {
                if (input.css(n)) lbl.css(n, input.css(n));
            });
            var chk = function () {
                (input.val() == "") ? lbl.show() : lbl.hide();
            }
            input[0].val = function (v) {
                input.val(v); chk();
            }
            input.focus(function () { lbl.hide(); })
				 .change(chk)
				 .blur(function () {
				     chk();
				     if (!arguments[0])
				         input.onblur();
				 });
            lbl.focus(function () { input[0].focus(); })
				.click(function () {
				    input[0].focus();
				    SendEvent("click", input[0]);
				});
            if (input.css('position') != 'absolute') {
                input.wrap("<span wmwrap='true' style='position:relative;'/>");
                lbl.css({ left: "3px", top: "1px", display: "inline" });
            }
            else
                lbl.css({
                    left: parseInt(input.css("left")) + 5 + "px",
                    top: parseInt(input.css("top")) + 1 + "px"
                });
            input.after(lbl);
            if ($.browser.mozilla && input.is("textarea")) { input.focus().blur(); }
            if (input.val() != "")
                lbl.hide();
            input.Disposable(function () {
                if (lbl)
                    lbl.unbind().remove().empty();
                lbl = null;
            });
            return input;
        });
    };
})(jQuery);

function TSRFVCBL_SetCssClass(value, Css) {
    var target = $get(value.TargetValidator);

    Sys.UI.DomElement.removeCssClass(target, value.InvalidCss);
    if (Css != "") {
        Sys.UI.DomElement.addCssClass(target, Css);
    }
}


function TSRFVCBL_EvaluateIsValid(value) {

    var target = $get(value.TargetValidator);
    if (target) {
        var inputs = target.getElementsByTagName("INPUT");
        var count = inputs.length;


        for (var i = 0; i < count; i++) {
            element = inputs[i];
            if ((element.type == "checkbox") && (element.checked)) {
                TSRFVCBL_SetCssClass(value, "");
                return true;
            }
        }

        TSRFVCBL_SetCssClass(value, value.InvalidCss);
        return false;
    }
    return true;
}

function TSRFVDDL_SetCssClass(value, Css) {
    var target = $get(value.TargetValidator);
    Sys.UI.DomElement.removeCssClass(target, value.TextCss);
    Sys.UI.DomElement.removeCssClass(target, value.FocusCss);
    Sys.UI.DomElement.removeCssClass(target, value.InvalidCss);
    if (Css != "") {
        Sys.UI.DomElement.addCssClass(target, Css);
    }
}


function TSRFVDDL_EvaluateIsValid(value) {

    var target = $get(value.TargetValidator);
    if (target)
        if (target.value == value.InitialValue) {
            TSRFVDDL_SetCssClass(value, value.InvalidCss);
            return false;
        }
        else {
            TSRFVDDL_SetCssClass(value, value.TextCss);
            return true;
        }
    return true;
}

function RecieveServerData(result, context) {
    //var TargetChildId = document.forms[0].elements[context];
    if (!context) {
        return;
    }
    context.length = 0;
    if (!result) {
        return;
    }

    var rows = result.split('\n');
    for (var i = 0; i < rows.length; ++i) {
        var values = rows[i].split('\t');
        var option = document.createElement("OPTION");
        option.value = values[0];
        option.innerHTML = values[1];
        context.appendChild(option);
    }
}

function TSRFVRBL_SetCssClass(value, Css) {
    var target = $get(value.TargetValidator);

    Sys.UI.DomElement.removeCssClass(target, value.InvalidCss);
    if (Css != "") {
        Sys.UI.DomElement.addCssClass(target, Css);
    }
}


function TSRFVRBL_EvaluateIsValid(value) {

    var target = $get(value.TargetValidator);
    if (target) {
        var inputs = target.getElementsByTagName("INPUT");
        var count = inputs.length;


        for (var i = 0; i < count; i++) {
            element = inputs[i];
            if ((element.type == "radio") && (element.checked)) {
                TSRFVRBL_SetCssClass(value, "");
                return true;
            }
        }

        TSRFVRBL_SetCssClass(value, value.InvalidCss);
        return false;
    }
    return true;
}

function DateTime_EvaluateIsValid(value) {
    var v = ValidateElement(value, value.TargetDateValidator)
    v = v && ValidateElement(value, value.TargetTimeValidator)

    return v;
}

function ValidateElement(value, targetValidator) {
    var target = $get(targetValidator);
    if (target) {
        var err = [];
        for (var i = 0; i < Page_Validators.length; i++)
            if (Page_Validators[i].controltovalidate == targetValidator) {
                var val = Page_Validators[i];
                if (val.id != value.id)
                    if (!val.evaluationfunction(val)) err.push(val.errormessage);
            }

        Sys.UI.DomElement.removeCssClass(target, target.className);
        if (err.length) {
            Sys.UI.DomElement.addCssClass(target, 'invalid');
            target.title = err.join("\n");
            return false;
        }
        else {
            Sys.UI.DomElement.addCssClass(target, 'text');
            target.title = '';
            return true;
        }
    }
    return true;
}

function TextBox_EvaluateIsValid(value) {
    var target = $get(value.TargetValidator);
    if (target) {
        var err = [];
        for (var i = 0; i < Page_Validators.length; i++)
            if (Page_Validators[i].controltovalidate == value.TargetValidator) {
                var val = Page_Validators[i];
                if (val.id != value.id)
                    if (!val.evaluationfunction(val)) err.push(val.errormessage);
            }


        if (err.length) {
            Sys.UI.DomElement.removeCssClass(target, target.className);
            Sys.UI.DomElement.addCssClass(target, 'invalid');
            target.title = err.join("\n");
            return false;
        }

        return true;
    }
    return true;
}



(function ($) {

    //Helper Function for Caret positioning
    $.fn.caret = function (begin, end) {
        if (this.length == 0)
            return;
        if (typeof begin == 'number') {
            end = (typeof end == 'number') ? end : begin;
            return this.each(function () {
                if (this.setSelectionRange) {
                    this.focus();
                    this.setSelectionRange(begin, end);
                }
                else if (this.createTextRange) {
                    var range = this.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', end);
                    range.moveStart('character', begin);
                    range.select();
                }
            });
        }
        if (this[0].setSelectionRange) {
            begin = this[0].selectionStart;
            end = this[0].selectionEnd;
        }
        else if (document.selection && document.selection.createRange) {
            var range = document.selection.createRange();
            begin = 0 - range.duplicate().moveStart('character', -100000);
            end = begin + range.text.length;
        }
        return { begin: begin, end: end };
    };

    //Predefined character definitions
    var charMap = {
        '9': "\\d", '5': "[0-5]", '2': "[0-2]",
        'A': "[A-Za-z]", 'C': "[A-Za-z0-9]",
        'W': "\\S", '*': "."
    };

    //Helper method to inject character definitions
    $.mask = {
        addPlaceholder: function (c, r) {
            charMap[c] = r;
        }
    };

    $.fn.unmask = function () {
        return this.trigger("unmask");
    };

    //Main Method
    $.fn.mask = function (mask, settings) {
        settings = $.extend({ placeholder: "_", completed: null }, settings);

        //Build Regex for format validation
        var re = new RegExp("^" + $.map(mask.split(""), function (c, i) {
            return charMap[c] || ((/[A-Za-z0-9]/.test(c) ? "" : "\\") + c);
        }).join('') + "$");

        return this.each(function () {
            var input = $(this);
            var buffer = new Array(mask.length);
            var locked = new Array(mask.length);
            var empty = "";
            var valid = false;
            var ignore = false;  			//Variable for ignoring control keys
            var firstNonMaskPos = null;

            //Build buffer layout from mask & determine the first non masked character			
            $.each(mask.split(''), function (i, c) {
                locked[i] = (charMap[c] == null);
                buffer[i] = locked[i] ? c : settings.placeholder;
                if (!locked[i] && firstNonMaskPos == null)
                    firstNonMaskPos = i;
            });
            empty = buffer.join('');

            function focusEvent() {
                setTimeout(function () { $(input[0]).caret(valid ? mask.length : firstNonMaskPos); }, 0);
                return true;
            };

            function blurEvent() {
                checkVal(true);
                input.change();
                return true;
            };

            function keydownEvent(e) {
                var pos = $(this).caret();
                var k = e.keyCode;
                ignore = (k < 16 || (k > 16 && k < 32) || (k > 32 && k < 41));
                initBuffer();
                //delete selection before proceeding
                if (pos.begin != pos.end && (!ignore || k == 8 || k == 46))
                    clearBuffer(pos.begin, pos.end);
                //backspace and delete get special treatment
                if (k == 8) { //backspace					
                    while (pos.begin-- >= 0) {
                        if (!locked[pos.begin]) {
                            buffer[pos.begin] = settings.placeholder;
                            var s = writeBuffer();
                            if ($.browser.opera) {
                                //Opera won't let you cancel the backspace, so we'll let it backspace over a dummy character.								
                                input.val(s.substring(0, pos.begin) + " " + s.substring(pos.begin));
                                $(this).caret(pos.begin + 1);
                            }
                            else
                                $(this).caret(Math.max(firstNonMaskPos, pos.begin));
                            return false;
                        }
                    }
                }
                else if (k == 46) { //delete
                    clearBuffer(pos.begin, pos.begin + 1);
                    writeBuffer();
                    $(this).caret(pos.begin + 1);
                    return false;
                }
                //				else if (k==27) { //escape
                //					clearBuffer(0,mask.length);
                //					writeBuffer();
                //					$(this).caret(firstNonMaskPos);					
                //					return false;
                //				}
                return true;
            };

            function keypressEvent(e) {
                if (ignore) {
                    ignore = false;	//Fixes Mac FF bug on backspace
                    return (e.keyCode == 8) ? false : null;
                }
                e = e || window.event;
                var k = e.charCode || e.keyCode || e.which;
                var pos = $(this).caret();
                if (e.ctrlKey || e.altKey) //Ignore
                    return true;
                if ((k >= 41 && k <= 122) || k == 32 || k > 186) { //typeable characters
                    var p = seekNext(pos.begin - 1);
                    if (p < mask.length) {
                        if (new RegExp(charMap[mask.charAt(p)]).test(String.fromCharCode(k))) {
                            buffer[p] = String.fromCharCode(k);
                            writeBuffer();
                            var next = seekNext(p);
                            $(this).caret(next);
                            if (settings.completed && next == mask.length)
                                settings.completed.call(input);
                        }
                    }
                }
                return false;
            };

            function clearBuffer(start, end) {
                for (var i = start; i < end && i < mask.length; i++)
                    if (!locked[i])
                        buffer[i] = settings.placeholder;
            };

            function writeBuffer() {
                return input.val(buffer.join('')).val();
            };

            function initBuffer() {
                //try to place charcters where they belong
                var test = input.val();
                var pos = firstNonMaskPos;
                for (var i = 0; i < mask.length; i++)
                    if (!locked[i]) {
                        buffer[i] = settings.placeholder;
                        while (pos++ < test.length) {
                            //Regex Test each char here.
                            var reChar = new RegExp(charMap[mask.charAt(i)]);
                            if (test.charAt(pos - 1).match(reChar)) {
                                buffer[i] = test.charAt(pos - 1);
                                break;
                            }
                        }
                    }
            }
            function checkVal(isBlur) {
                initBuffer();
                var s = writeBuffer();
                if (!s.match(re)) {
                    if (isBlur && empty == s) {
                        input.val("");
                        clearBuffer(0, mask.length);
                    }
                    valid = false;
                }
                else
                    valid = true;
            };

            function seekNext(pos) {
                while (++pos < mask.length)
                    if (!locked[pos])
                        return pos;
                return mask.length;
            };

            function cleanup() {
                input.unbind("focus", focusEvent);
                input.unbind("blur", blurEvent);
                input.unbind("keydown", keydownEvent);
                input.unbind("keypress", keypressEvent);
                if ($.browser.msie)
                    this.onpaste = null;
                else if ($.browser.mozilla)
                    this.removeEventListener('input', checkVal, false);
            };
            input.one("unmask", cleanup);
            input.bind("focus", focusEvent);
            input.bind("blur", blurEvent);
            input.bind("keydown", keydownEvent);
            input.bind("keypress", keypressEvent);
            //Paste events for IE and Mozilla thanks to Kristinn Sigmundsson
            if ($.browser.msie)
                this.onpaste = function () { setTimeout(checkVal, 0); };
            else if ($.browser.mozilla)
                this.addEventListener('input', checkVal, false);
            checkVal(true);		//Perform initial check for existing values
            input.Disposable(function () {
                if (input)
                    cleanup();
                input = null;
            });
        });
    };

    $.fn.NumInput = function () {
        return this.each(function () {
            var input = $(this);
            function keypress(e) {
                e = e || window.event;
                var k = e.charCode || e.keyCode || e.which;
                return "0123456789,.-".indexOf(String.fromCharCode(k)) >= 0;
            };
            input.bind("keypress", keypress);
            input.Disposable(function () {
                input = null;
            });
        });
    }

})(jQuery);


String.prototype.capitalize = function () {
    return this.replace(/\w+/g, function (a) {
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};

function focusNext(el) {
    try {
        var arr = $(el).parents('form:eq(0),body').find('button:visible,input:visible,textarea:visible,select:visible');
        for (var i = arr.index(el) + 1; i > 0 && i < arr.length; i++)
            if (!arr[i].disabled && !arr[i].readOnly) {
                arr[i].focus();
                break;
            }
    }
    catch (e) {
        el.blur();
    }
}

function NCID(elem, id) {
    var sid = elem.id;
    while (true) {
        var nc = sid.lastIndexOf("_");
        if (nc < 0)
            return null;
        sid = sid.substr(0, nc);
        if (id.substr(0, 3) == ".._")
            id = id.substring(3);
        else
            break;
    }
    return sid + "_" + id;
}

function ExpandoCleanup(d) {
    if (!d)
        return;
    var a = d.attributes, i, l, n;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            n = a[i].name;
            if (typeof d[n] === 'function')
                d[n] = null;
        }
    }
    a = d.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1)
            ExpandoCleanup(d.childNodes[i]);
    }
}

function DebugTime() {
    this.start = (new Date()).getTime();
    this.expired = function () {
        return (new Date()).getTime() - this.start;
    }
    return this;
}


function SendEvent(evName, el) {
    if (document.createEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(evName, false, false);
        el.dispatchEvent(evt);
    }
    else {
        var evt = document.createEventObject();
        evt.target = el;
        el.fireEvent("on" + evName); //, evt);
    }
};


function PopupManager() {
    function HitTest(ev) {
        for (var p = ev.target; p != null; p = p.parentNode)
            if (p == jQuery.popupLayer.inpElem[0] || p == jQuery.popupLayer[0])
                return true;
        return false;
    };
    function Dispose() {
        if (jQuery.popupLayer) {
            jQuery.popupLayer.hide();
            jQuery.popupLayer.children(":not(:eq(0))").remove().empty();
            jQuery.popupLayer.inpElem = null;
            jQuery.popupLayer.onhide = null;
            $(document.body).unbind("mousedown", CheckLostFocus);
        }
    }
    function CheckLostFocus(ev) {
        var el = jQuery.popupLayer.inpElem;
        if (!jQuery.popupLayer || !el || HitTest(ev))
            return;
        if (!jQuery.popupLayer.onHide || !jQuery.popupLayer.onHide()) {
            Dispose();
            SendEvent("blur", el[0]);
        }
    }

    this.layer = function () {
        if (!jQuery.popupLayer)
            jQuery.popupLayer = jQuery('<div style="position:absolute;display:none;z-index:99998;">'
				+ '<iframe style="position:absolute;z-index:99998;" frameborder=10 src=#></iframe>'
				+ '</div>').appendTo(document.body);
        return jQuery.popupLayer;
    };
    this.show = function (align, pop, inp, onhide) {
        var offset = align.offset();
        pop[0].dir = inp[0].dir;
        pop[0].style.width = inp[0].style.width;
        pop[0].style.textAlign = inp[0].style.textAlign;



        if (document.body.currentStyle.direction == 'rtl')
            jQuery.popupLayer.css({ top: offset.top + align.outerHeight(), left: offset.left + inp.outerWidth() })
					.show();
        else
            jQuery.popupLayer.css({ top: offset.top + align.outerHeight(), left: offset.left })
					.show();


        jQuery("iframe", jQuery.popupLayer).css({ width: pop.outerWidth(), height: pop.outerHeight() });
        jQuery.popupLayer.inpElem = inp || align;
        jQuery.popupLayer.onHide = onhide;
        $(document.body).unbind("mousedown", CheckLostFocus);
        $(document.body).bind("mousedown", CheckLostFocus);
        return this;
    }

    this.clear = function () {
        Dispose();
    }
    return this;
}

(function ($) {
    $.popupLayer = null;
    var popMgr = new PopupManager();

    $.fn.Disposable = function (cln) {
        return this.each(function () {
            var el = this;
            var orgDispose = el.dispose;
            function cleanup() {
                if (cln)
                    cln(el);
                if (el) {
                    $(el).unbind();
                    ExpandoCleanup(this);
                }
                el = null;
            }
            $(window).bind("unload", cleanup);
            this.dispose = function () {		// will be called by MS for cleanup
                if (el && orgDispose)
                    orgDispose.apply(el);
                cleanup();
            }
        });
    };

    $.fn.Suggest = function (options) {
        return this.each(function () {
            options = $.extend({
                source: window.location.pathname,
                method: null,
                ctxKey: "",
                delay: 250,
                selectClass: 'selected',
                minchars: 0,
                onSelect: function (inp, data) {
                    $(inp).val(data[0]);
                }
            }, options);
            var input = $(this).attr("autocomplete", "off");
            var data = [];
            var results = null;
            var timeout = 0;	// hold timeout ID for suggestion results to appear	

            // I really hate browser detection, but I don't see any other way
            if ($.browser.mozilla)
                input.keypress(processKey);	// onkeypress repeats arrow keys in Mozilla/Opera
            else
                input.keydown(processKey);		// onkeydown repeats arrow keys in IE/Safari

            function processKey(e) {
                // handling up/down/escape requires results to be visible
                // handling enter/tab requires that AND a result to be selected
                if (/^13$|^9$|^27$|^38$|^40$/.test(e.keyCode)) {
                    if (!results || results.length == 0)
                        return true;
                    if (e.preventDefault) e.preventDefault();
                    if (e.stopPropagation) e.stopPropagation();
                    e.cancelBubble = true;
                    e.returnValue = false;
                    switch (e.keyCode) {
                        case 38: prevRes(); break;	// up
                        case 40: nextRes(); break;	// down
                        case 27: Hide(); break;	//	escape
                        case 9: case 13: selCurRes(); break;	// tab/enter
                    }
                    return false;
                }
                if (timeout)
                    clearTimeout(timeout);
                timeout = setTimeout(function () {
                    timeout = 0;
                    var ct = options.ctxKey.split(';');
                    for (var i = 0; i < ct.length; i++)
                        if (ct[i].substr(0, 1) == "#")
                            ct[i] = $get(NCID(input[0], ct[i].substr(1))).value;
                    var prm = { prefixText: input.val(), contextKey: ct.join("\n") };
                    Sys.Net.WebServiceProxy.invoke(options.source, options.method,
							false, prm, function (txt, ctx) { Show(txt); }, null, ""
						);
                }, options.delay);
                return true;
            }

            function Hide() {
                if (results != null) {
                    popMgr.clear();
                    if (timeout)
                        clearTimeout(timeout);
                    timeout = 0;
                    results = null;
                }
            };

            function Show(txt) {
                Hide();
                data = txt.split("\n");
                if (!data || !data.length || !data[0].length)
                    return;
                var html = '<table cellpadding=0 cellspacing=0 border=0 class="text" style="font-size:11px;position:absolute;white-space:nowrap;'
						+ 'background: #F2F2F2;border:ridge 3px silver;z-index:99999;cursor:hand;">';
                for (var i = 0; i < data.length; i++) {
                    data[i] = data[i].split("\t");
                    var tmp = '<tr ix=' + i + '>';
                    for (var j = 0; j < data[i].length; j++)
                        tmp += '<td>&nbsp;' + (data[i][j] = data[i][j].trim()) + '&nbsp;</td>';
                    html += tmp + '</tr>';
                }
                results = $(html + '</table>').appendTo(popMgr.layer());
                $("td", results).css("white-space", "nowrap");
                popMgr.show(input, results, input, Hide);

                $('tr', results)
					.mouseover(function () {
					    $('tr', results).removeClass(options.selectClass);
					    $(this).addClass(options.selectClass);
					})
					.click(function (e) {
					    selCurRes();
					});
            }

            function getCurSel() {
                if (!results || !results.is(':visible'))
                    return null;
                var ret = $('tr.' + options.selectClass, results);
                return (ret.length > 0) ? ret : null;
            }

            function selCurRes() {
                var curRes = getCurSel();
                Hide();
                if (curRes) {
                    var ix = parseInt(curRes.attr("ix"));
                    if (ix >= 0 && ix < data.length) {
                        options.onSelect(input[0], data[ix]);
                        SendEvent('change', input[0]);
                    }
                }
            }

            function nextRes() {
                var curRes = getCurSel();
                if (!curRes)
                    $('tr:first-child', results).addClass(options.selectClass);
                else
                    curRes.removeClass(options.selectClass)
						  .next().addClass(options.selectClass);
            }

            function prevRes() {
                var curRes = getCurSel();
                if (!curRes)
                    $('tr:last-child', results).addClass(options.selectClass);
                else
                    curRes.removeClass(options.selectClass)
						  .prev().addClass(options.selectClass);
            }
            input.Disposable(function () {
                Hide();
                data = input = null;
            });
        });
    };

    $.fn.Calendar = function (frmt) {
        return this.each(function () {
            var input = $(this).attr("autocomplete", "off");
            var MonthNames = Sys.CultureInfo.CurrentCulture.dateTimeFormat.MonthNames;
            var DayNames = Sys.CultureInfo.CurrentCulture.dateTimeFormat.AbbreviatedDayNames;
            var WeekStart = 0;
            frmt = frmt || "MM/dd/yyyy";
            var selectedDate = new Date();
            var clndrHtml = null;

            function Date2Str(yy, mm, dd) {
                var d = (typeof yy == "number") ? new Date(yy, mm, dd) : new Date(yy);
                return d.format(frmt);
            };

            function Show() {
                if (clndrHtml == null) {
                    Draw(input.val());
                    input.unbind("mouseup", Show);
                    input.bind("keydown", Hide);
                }
            };

            function Hide() {
                if (clndrHtml != null) {
                    popMgr.clear();
                    input.bind("mouseup", Show);
                    input.unbind("keydown", Hide);
                    clndrHtml = null;
                }
            };

            function LostFocus() {
                Hide();
                SendEvent('blur', input[0]);
            }
            function Draw(dd) {
                selectedDate = (typeof (dd) == "string") ? Date.parseLocale(dd, frmt) : dd;
                if (!selectedDate || isNaN(selectedDate))
                    selectedDate = new Date();
                dd = selectedDate;
                var curMon = dd.getMonth();
                var curYr = dd.getFullYear();
                var curDy = dd.getDate();
                var cmFirst = new Date(curYr, curMon, 1);
                var cmLast = (new Date(curYr, curMon + 1, 0)).getDate();
                var lmLast = (new Date(curYr, curMon, 0)).getDate();
                popMgr.clear();
                clndrHtml = $('<table style="position:absolute;font-size:12px;'
						+ 'background:#F2F2F2;cursor:arrow;white-space:nowrap;'
						+ 'border:ridge 3px silver;z-index:99998;text-align:center;" '
						+ 'class="date_selector"><thead>'
					+ '<tr><td>&laquo;</td><td colspan=5><select /><select/><td>&raquo;</td></tr>'
					+ '<tr><th>' + DayNames.join("</th><th>") + '</th></tr>'
					+ '</thead><tbody/></table>');
                $('thead tr:eq(0) td:eq(0)', clndrHtml).attr("dd", "X").bind("click", function () {
                    Draw(new Date(curYr, curMon - 1, curDy));
                });
                $('thead tr:eq(0) td:eq(2)', clndrHtml).attr("dd", "X").bind("click", function () {
                    Draw(new Date(curYr, curMon + 1, curDy));
                });
                var sel = $('select', clndrHtml).bind("change", function () {
                    Draw(this.value);
                });
                for (var i = 0; i < MonthNames.length - 1; i++)
                    sel[0].options[i] = new Option(MonthNames[i], Date2Str(curYr, i, curDy));
                for (var i = dd.getFullYear() - 5; i < dd.getFullYear() + 5; i++)
                    sel[1].options[sel[1].options.length] = new Option(i, Date2Str(i, curMon, curDy));
                sel.val(Date2Str(dd));
                var dayCells = "<tr>", cn = 0
                for (var i = 0; i < cmFirst.getDay() ; i++, cn++)
                    dayCells += "<td style='color:#888888'>" + (lmLast - cmFirst.getDay() + i + 1) + "</td>";
                for (var i = 1; i <= cmLast; i++, cn++) {
                    if ((cn % 7) == 0)
                        dayCells += "</tr><tr>";
                    dayCells += '<td style="font-weight:bold;';
                    if (i == dd.getDate())
                        dayCells += "background-color:#9999ff;"
                    dayCells += '" dd="' + Date2Str(curYr, curMon, i) + '">' + i + '</td>';
                }
                for (i = 1; (cn % 7) != 0; i++, cn++)
                    dayCells += "<td style='color:#888888'>" + i + "</td>";
                //				dayCells += "</tr><tr><td colspan='7' dd='" 
                //					+ Date2Str(new Date()) + "'>Ajourd'hui</td></tr>";
                var tbody = $('tbody', clndrHtml).append(dayCells);
                $("td[dd]", clndrHtml)
						.css("cursor", "hand")
						.hover(function () { $(this).addClass("selected"); },
							   function () { $(this).removeClass("selected"); })
                $("td[dd]", tbody).bind("click", function (event) {
                    Hide();
                    var stringDate = $(event.target).attr("dd");
                    if (input.val() != stringDate)
                        SendEvent('change', input.val(stringDate)[0]);
                    input.focus();
                    return false;
                });

                clndrHtml.appendTo(popMgr.layer());
                popMgr.show(input, clndrHtml, input, LostFocus);
            };
            input.bind("click", Show);
            input.Disposable(function () {
                Hide();
                data = input = null;
            });
        });
    };
})(jQuery);

(function ($) {
    $.fn.Validator = function () {
        return this.each(function () {
            var input = $(this);
            var validators = null;
            function getValidators() {
                if (!validators) {
                    validators = [];
                    for (var i = 0; i < Page_Validators.length; i++)
                        if (document.getElementById(Page_Validators[i].controltovalidate) == input[0])
                            validators[validators.length] = Page_Validators[i];
                }
                return validators;
            }

            function check() {
                if (jQuery.popupLayer && jQuery.popupLayer.inpElem)
                    return;
                var vals = getValidators(), err = [];
                if (!vals || !vals.length)
                    return;
                for (var i = vals.length - 1; i >= 0; i--)
                    if (!vals[i].evaluationfunction(vals[i]))
                        err.push(vals[i].errormessage);

                input.removeClass(input.attr('class'));
                if (err.length) {
                    input.addClass('invalid');
                    this.title = err.join("\n");
                    return false;
                }
                else {
                    input.addClass('text');
                    this.title = '';
                    return true;
                }
            }

            function onFocus() {
                input.removeClass(input.attr('class'));
                input.addClass('focus');
            }

            input.bind('blur', check).bind('change', check).bind('focus', onFocus)
            input.Disposable(function () {
                if (!input)
                    return;
                validators = input = null;
            });

        });
    };
})(jQuery);


