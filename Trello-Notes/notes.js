/*************************************** notes.js ***************************************************
** This file is responsible for actualy displaying and saving the notes
*****************************************************************************************************/

var id=location.href.replace(/.*\//,'');
id=id.replace(/#/,'');
code = '(function(){';
code += 'var id=\''+id+'\';';

/************************************ Minified Code ************************************************
** This code has been minified so that it can be injected into the page and run in Trello's environment.
** I use http://jscompress.com/
*****************************************************************************************************/

code += 'function show_sticky(a){var b=Models.Card.get(a);var c=b.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)?b.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1]:"";c=c.replace(/ ?\\[\\]\\(\\"(.*)\\"\\)/,"");if(c=="")show_sticky_button(a);else show_sticky_text(a)}function show_sticky_button(a){var b=Models.Card.get(a);$(b.view.el).find(".badges").append($("<div>Note</div>").addClass("badge").click(function(){show_sticky_text(a)}).click(function(a){a.stopPropagation()}))}function show_sticky_text(a){var b=Models.Card.get(a);var c=b.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)?b.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1]:"";var d="lightyellow";var e=0;if(c.match(/\\[\\]\\(\\"(.*)\\"\\)/)){d=c.match(/\\[\\]\\(\\"(.*)\\"\\)/)[1];if(d.match(/[\\d]/))d="#"+d;c=c.replace(/ ?\\[\\]\\(\\"(.*)\\"\\)/,"")}e=$("<span></span>").css("display","none").css("font-size","x-small").text(" "+c+" ").appendTo($(b.view.el).find("a.list-card-title")).width()+15;$(b.view.el).find(".card-labels").remove(".sticky-note").after($("<div></div>").append($("<input></input>").css("width",e).attr("size",c.length+1).val(c.replace(/\\\\/,"")).addClass("sticky-note").attr("type","text").css("height","20px").css("font-size","x-small").css("min-height","0px").css("background-color","lightyellow").css("background-color",d).css("margin","0px").css("padding-left","3px").focus(function(){$(this).css("width","95%")}).blur(function(a){if(a.isTrigger)return false;var c=$(this).val();c=c.replace(/#/,"\\\\#");if(c.match(/\\{(.*)\\}/)){c=c.replace(/\\{.*\\}/,"[](\\""+c.match(/\\{(.*)\\}/)[1]+"\\")")}else if(d!="lightyellow"){c=c+" [](\\""+d+"\\")"}b.api.update({idParents:[b.attributes.idList,b.attributes.idBoard],updates:[{set:{desc:">>>> "+c+"\\n\\n"+b.attributes.desc.replace(/^>>>>[^\\n]*\\n\\n/,"")}}]},function(a){},function(a){})})).click(function(a){a.stopPropagation()}).keydown(function(a){a.stopPropagation()}).keypress(function(a){a.stopPropagation()}).keyup(function(a){a.stopPropagation()}))}$(document).bind("cardRendered",function(e,a){show_sticky(a)})';

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
	var note = (card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/) ? card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1] : "");
	note = note.replace(/ ?\\[\\]\\(\\&quot;(.*)\\&quot;\\)/,"")
	if(note == "") {
		show_sticky_button(card_id);
	}
	else {
		//show_sticky_button(card_id);
		show_sticky_text(card_id);
	}
}

function show_sticky_button(card_id) {
	var card=Models.Card.get(card_id);
	$(card.view.el).find(".badges").append( $("<div>Note</div>")
		.addClass("badge")
		.click(function(){show_sticky_text(card_id)})
		.click(function(e){e.stopPropagation();})
	)
}

function show_sticky_text(card_id) {
	var card = Models.Card.get(card_id);
	var text = (card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/) ? card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1] : "")
	var color = "lightyellow";
	var textWidth = 0;

	if ( text.match(/\\[\\]\\(\\&quot;(.*)\\&quot;\\)/) ) {
		color = text.match(/\\[\\]\\(\\&quot;(.*)\\&quot;\\)/)[1];
		if (color.match(/[\\d]/))
			color = "#"+color;
		text = text.replace(/ ?\\[\\]\\(\\&quot;(.*)\\&quot;\\)/,"");
	}
	
	
	// First put the text of the note inside the <a> tag so it can be used for filtering
	textWidth = $("<span></span>")
	.css("display","none")
	.css("font-size","x-small")
	.text(" "+text+" ")
	.appendTo( $(card.view.el).find("a.list-card-title") )
	.width()+15;
	

	// Then insert the text box for editing the note
	$(card.view.el).find(".card-labels")
	.remove(".sticky-note")
	.after( $("<div></div>")
		.append( $("<input></input>")
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
				$(this).css("width","95%");
			})
			.blur(function(e){
				// Make sure it's not a false alarm
				if(e.isTrigger)
					return false;
				
				// Condition the inputted text
				var val = $(this).val();
				val = val.replace(/#/,"\\\\#");
				
				if( val.match(/\\{(.*)\\}/) ) {
					val = val.replace(/\\{.*\\}/,"[](\\&quot;"+val.match(/\\{(.*)\\}/)[1]+"\\&quot;)");
				} else if( color!= "lightyellow" ) {
					val = val + " [](\\&quot;"+color+"\\&quot;)";
				}
				
				card.api.update(
					{
						idParents:[card.attributes.idList,card.attributes.idBoard],
						updates:[{set:{
							desc:">>>> "
							+val
							+"\\n\\n"+card.attributes.desc.replace(/^>>>>[^\\n]*\\n\\n/,"")
						}}]
					},
					function (c){},
					function (d){}
				);
			})
		)
		.click(function(e){e.stopPropagation();})
		.keydown(function(e){e.stopPropagation();})
		.keypress(function(e){e.stopPropagation();})
		.keyup(function(e){e.stopPropagation();})
	)
}

*/

