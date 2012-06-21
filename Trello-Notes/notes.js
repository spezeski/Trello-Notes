/*************************************** notes.js ***************************************************
** This file is responsible for actualy displaying and saving the notes
*****************************************************************************************************/

var id=location.href.replace(/.*\//,'');
id=id.replace(/#/,'');
code = '(function(){';
code += 'var id=\''+id+'\';';

/************************************ Minified Code **************************************************
** This code has been minified so that it can be injected into the page and run in Trello's environment.
** I use http://jscompress.com/
******************************************************************************************************/

code += 'function show_sticky(a){var b=Models.Card.get(a);var c=b.attributes.desc.match(/>>>> [^\\n]*\\n/g);if(c)$.each(c.reverse(),function(b,c){c=c.match(/>>>> ([^\\n]*)\\n/)[1];show_sticky_text(c,a)});show_sticky_button(a)}function show_sticky_button(a){var b=Models.Card.get(a);$(b.view.el).find(".badges").append($("<div>Note</div>").addClass("badge").click(function(){show_sticky_text("",a,true)}).click(function(a){a.stopPropagation()}))}function show_sticky_text(a,b,c){var d=Models.Card.get(b);var e="lightyellow";var f=0;if(a.match(/\\[\\]\\(\\"(.*)\\"\\)/)){e=a.match(/\\[\\]\\(\\"(.*)\\"\\)/)[1];if(e.match(/[\\d]/))e="#"+e;a=a.replace(/ ?\\[\\]\\(\\"(.*)\\"\\)/,"")}if(!c&&a=="")return false;textSpan=$("<span></span>").css("display","none").css("font-size","x-small").text(" "+a+" ").appendTo($(d.view.el).find("a.list-card-title"));f=textSpan.width()+15;$(d.view.el).find(".card-labels").remove(".sticky-note").after($("<div></div>").append($("<input></input>").data("color",e).css("width",f).attr("size",a.length+1).val(a.replace(/\\\\/,"")).addClass("sticky-note").attr("type","text").css("height","20px").css("font-size","x-small").css("min-height","0px").css("background-color","lightyellow").css("background-color",e).css("margin","0px").css("padding-left","3px").css("float","left").focus(function(){}).blur(function(a){if(a.isTrigger)return false;var b="";$.each($(this).parent().parent().find(".sticky-note"),function(a,c){e=$(c).data("color");var d=">>>> "+$(c).val();d=d.replace(/#/,"\\\\#");if(d.match(/\\{(.*)\\}/)){d=d.replace(/\\{.*\\}/,"[](\\""+d.match(/\\{(.*)\\}/)[1]+"\\")")}else if(e!="lightyellow"){d=d+" [](\\""+e+"\\")"}d+="\\n";b+=d});console.log(b);d.api.update({idParents:[d.attributes.idList,d.attributes.idBoard],updates:[{set:{desc:b+d.attributes.desc.replace(/>>>>[^\\n]*\\n/g,"")+"\\n"}}]},function(a){},function(a){})}).keyup(function(a){a.stopPropagation();if(a.which==13){$("#search-text").focus().blur()}}).keydown(function(a){textSpan.text($(this).val());$(this).css("width",textSpan.width()+20)})).click(function(a){a.stopPropagation()}).keydown(function(a){a.stopPropagation()}).keypress(function(a){a.stopPropagation()}).keyup(function(a){a.stopPropagation()}))}$(document).bind("cardRendered",function(a,b){show_sticky(b)})';

code += '})()';

if(document.getElementById('stickyPlugin') == null){
	var script=document.createElement('script');
	script.setAttribute('id','stickyPlugin');
	script.innerHTML = code;
	document.getElementsByTagName('head').item(0).appendChild(script);
	document.getElementById('stickyPlugin').className = id;
}

/********************************* Non-Minified Code ************************************************
** Notes:
**    all instances of \ need to be replaced with \\ 
**    the code will go between single quotes, so single quotes should be avoided within the code.
**    if a single quote can't be avoided, it needs to be escaped after minification
*****************************************************************************************************/

/*

// Notes must be re-drawn every time the card is rendered.
$(document).bind("cardRendered",function(e,id){show_sticky(id)});

// If there is a note, show it.  If not, show a button to add a note.
function show_sticky(card_id) {
	var card=Models.Card.get(card_id);
	var notes = card.attributes.desc.match(/>>>> [^\\n]*\\n/g);
	if(notes)
	$.each(notes.reverse(),function(i,note) {	
		note = note.match(/>>>> ([^\\n]*)\\n/)[1];
		//note = note.replace(/ ?\\[\\]\\(\\&quot;(.*)\\&quot;\\)/,"");
		show_sticky_text(note,card_id);
	});
	show_sticky_button(card_id);
}

function show_sticky_button(card_id) {
	var card=Models.Card.get(card_id);
	$(card.view.el).find(".badges").append( $("<div>Note</div>")
		.addClass("badge")
		.click(function(){show_sticky_text("",card_id,true)})
		.click(function(e){e.stopPropagation();})
	)
}

function show_sticky_text(text,card_id,newNote) {
	var card = Models.Card.get(card_id);
	var color = "lightyellow";
	var textWidth = 0;

	if ( text.match(/\\[\\]\\(\\&quot;(.*)\\&quot;\\)/) ) {
		color = text.match(/\\[\\]\\(\\&quot;(.*)\\&quot;\\)/)[1];
		if (color.match(/[\\d]/))
			color = "#"+color;
		text = text.replace(/ ?\\[\\]\\(\\&quot;(.*)\\&quot;\\)/,"");
	}	
	
	if(!newNote && text == "")
		return false;
	
	// First put the text of the note inside the <a> tag so it can be used for filtering
	textSpan = $("<span></span>")
	.css("display","none")
	.css("font-size","x-small")
	.text(" "+text+" ")
	.appendTo( $(card.view.el).find("a.list-card-title") );
	
	textWidth = textSpan.width()+15;


	// Then insert the text box for editing the note
	$(card.view.el).find(".card-labels")
	.remove(".sticky-note")
	.after( $("<div></div>")
		.append( $("<input></input>")
			.data("color",color)
			.css("width",textWidth)
			.attr("size",text.length+1)
			.val(
				text.replace(/\\\\/,"")
			)
			.addClass("sticky-note")
			.attr("type","text")
			.css("height","20px")
			.css("font-size","x-small")
			.css("min-height","0px")
			.css("background-color","lightyellow")
			.css("background-color",color)
			.css("margin","0px")
			.css("padding-left","3px")
			.css("float","left")
			.focus(function() {
				//$(this).css("width","95%");
			})
			.blur(function(e){
				// Make sure it's not a false alarm
				if(e.isTrigger)
					return false;
				
				var notes = "";
				
				
				$.each( $(this).parent().parent().find(".sticky-note"),function(a,b) {
					color = $(b).data("color");
					// Condition the inputted text
					var val = ">>>> " + $(b).val();
					val = val.replace(/#/,"\\\\#");
					
					if( val.match(/\\{(.*)\\}/) ) {
						val = val.replace(/\\{.*\\}/,"[](\\&quot;"+val.match(/\\{(.*)\\}/)[1]+"\\&quot;)");
					} else if( color!= "lightyellow" ) {
						val = val + " [](\\&quot;"+color+"\\&quot;)";
					}
					val += "\\n";
					notes += val;
				});
				
				card.api.update(
					{
						idParents:[card.attributes.idList,card.attributes.idBoard],
						updates:[{set:{
							desc:notes+card.attributes.desc.replace(/>>>>[^\\n]*\\n/g,"")+"\\n"
						}}]
					},
					function (c){},
					function (d){}
				);
				
				
			})
			.keyup(function(e){
				e.stopPropagation();
				if(e.which == 13) {
					// can't figure out why $(e.target).blur() doesn't work, but this does work.
					$("#search-text").focus().blur()
				}
			})
			.keydown(function(e){
				textSpan.text($(this).val());
				$(this).css("width",textSpan.width()+20);
			})
		)
		.click(function(e){e.stopPropagation();})
		.keydown(function(e){e.stopPropagation();})
		.keypress(function(e){e.stopPropagation();})
		.keyup(function(e){e.stopPropagation();})
	)
}

*/