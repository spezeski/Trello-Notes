var id=location.href.replace(/.*\//,'');
id=id.replace(/#/,'');
code = 'var id=\''+id+'\';';


// This code is the minified version of the commented code below.
// It needs to be minified and stored in a string so it can be injected into the page.
code += 'function waitStickyPlugin(){var a=Models.Board.get(id);if(!a||!a.isReady||!a.listList.models||a.listList.models.length==0||$(".list-card").length==0){setTimeout(waitStickyPlugin,100)}else{initStickyPlugin()}}function show_sticky(a){var b=Models.Card.get(a);var c=b.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)?b.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1]:"";if(c=="")show_sticky_button(a);else show_sticky_text(a)}function show_sticky_button(a){var b=Models.Card.get(a);$(b.view.el).find(".badges").append($("<div>Note</div>").addClass("badge").click(function(){show_sticky_text(a)}).click(function(a){a.stopPropagation()}))}function show_sticky_text(a){var d=Models.Card.get(a);$(d.view.el).find("a.list-card-title").append($("<span></span>").css("display","none").text(" "+(d.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)?d.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1]:"")+" "));$(d.view.el).find(".card-labels").remove(".sticky-note").after($("<div></div>").append($("<input></input>").val((d.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)?d.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1]:"").replace(/\\\\/,"")).addClass("sticky-note").attr("type","text").css("width","95%").css("height","20px").css("font-size","x-small").css("min-height","0px").css("background-color","lightyellow").css("margin","0px").css("padding-left","5px").blur(function(){d.api.update({idParents:[d.attributes.idList,d.attributes.idBoard],updates:[{set:{desc:">>>> "+$(this).val().replace(/#/,"\\\\#")+"\\n\\n"+d.attributes.desc.replace(/^>>>>[^\\n]*\\n\\n/,"")}}]},function(a){b.set(a,{fromServer:!0})},function(a){b?b(c,a):c.trigger("error",c,a,e)})})).click(function(a){a.stopPropagation()}).keydown(function(a){a.stopPropagation()}).keypress(function(a){a.stopPropagation()}).keyup(function(a){a.stopPropagation()}))}function modify_card(a){var b=Models.Card.get(a);if(!b.view){setTimeout(function(){modify_card(a)},100);return false}(function(){var a=b.view.render;b.view.render=function(){var c=a.apply(this,arguments);show_sticky(b.id);return c}})();(function(){var a=b.view.showDetail;b.view.showDetail=function(){var b=a.apply(this,arguments);$(".js-close-window").click(function(){Models.Board.get(id).view.renderLists()});return b}})();(function(){var a=b.ready;b.ready=function(){b.view.render()}})();b.view.render()}function modify_board(){if(!Models.Notification||!Models.Card||!Models.Board.get(id)){setTimeout(modify_board,100);return false}(function(){var a=Models.Notification.add;Models.Notification.add=function(){var b=a.apply(this,arguments);Models.Board.get(id).view.renderLists();return b}})();(function(){var a=Models.Card.add;Models.Card.add=function(){var b=a.apply(this,arguments);modify_card(arguments[0].id);return b}})();Models.Notification.bind("change",function(a){Models.Board.get(id).view.renderLists()})}function initStickyPlugin(){modify_board();$.each(Models.Board.get(id).listList.models,function(a,b){$.each(b.cardList.models,function(a,b){modify_card(b.id)})})}waitStickyPlugin()';

if(document.getElementById('stickyPlugin') == null){
	var script=document.createElement('script');
	script.setAttribute('id','stickyPlugin');
	script.innerHTML = code;
	document.getElementsByTagName('head').item(0).appendChild(script);
	document.getElementById('stickyPlugin').className = id;
} else if ( document.getElementById('stickyPlugin').className != id) {
	document.getElementById('stickyPlugin').className = id;
	// Re-load the page to clear all the modifications and start fresh
	// when the board changes.
	location=location;
}

/********************************* Non-Minified Code ************************************************
** This code gets minified so that it can be injected into the page and run in Trello's environment.
** I use http://jscompress.com/
** Some caveats are:
**    all instances of \ need to be replaced with \\
**    the code will go between single quotes, so single quotes should be avoided within the code
**    if a single quote can't be avoided, it needs to be escaped after minification
*****************************************************************************************************/

/*

// Wait for the models to be ready
waitStickyPlugin();
function waitStickyPlugin() {
	var i = Models.Board.get(id);
	if(!i || !i.isReady || !i.listList.models || i.listList.models.length == 0 || $(".list-card").length == 0) {
		setTimeout(waitStickyPlugin, 100);
	} else {
		initStickyPlugin();
	}
}

// If there is a note, show it.  If not, show a button to add a note.
function show_sticky(card_id) {
	var card=Models.Card.get(card_id);
	var note = (card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/) ? card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1] : "");
	if(note == "")
		show_sticky_button(card_id);
	else
		show_sticky_text(card_id);
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
	var card=Models.Card.get(card_id);
	
	// First put the text of the note inside the <a> tag so it can be used for filtering
	$(card.view.el).find("a.list-card-title")
	.append( $("<span></span>")
		.css("display","none")
		.text(
			" "+(card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/) ? card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1] : "")+" "
		)
	);

	// Then insert the text box for editing the note
	$(card.view.el).find(".card-labels")
	.remove(".sticky-note")
	.after( $("<div></div>")
		.append( $("<input></input>")
			.val(
				(card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/) ? card.attributes.desc.match(/>>>> ([^\\n]*)\\n\\n/)[1] : "")
				.replace(/\\\\/,"")
			)
			.addClass("sticky-note")
			.attr("type","text")
			.css("width","95%")
			.css("height","20px")
			.css("font-size","x-small")
			.css("min-height","0px")
			.css("background-color","lightyellow")
			.css("margin","0px")
			.css("padding-left","5px")
			.blur(function(){
				card.api.update(
					{
						idParents:[card.attributes.idList,card.attributes.idBoard],
						updates:[{set:{
							desc:">>>> "
							+$(this).val().replace(/#/,'\\\\#')
							+"\\n\\n"+card.attributes.desc.replace(/^>>>>[^\\n]*\\n\\n/,"")
						}}]
					},
					function (c){b.set(c,{fromServer:!0})},
					function (d){b?b(c,d):c.trigger("error",c,d,e)}
				);
			})
		)
		.click(function(e){e.stopPropagation();})
		.keydown(function(e){e.stopPropagation();})
		.keypress(function(e){e.stopPropagation();})
		.keyup(function(e){e.stopPropagation();})
	)
}

// Override the card-level Trello functions that would normally cause the notes to disappear.
function modify_card(card_id) {
	var card = Models.Card.get(card_id);
	
	// If the card.view isn't ready yet, try again in 100ms
	if (!card.view) {
		setTimeout(function(){modify_card(card_id)},100);
		return false;
	}
	
	// Override card.view.render() to allow sticky notes to be shown on the cards.
	(function() {
		var proxied = card.view.render;
		card.view.render = function() {
			var v = proxied.apply(this, arguments);
			show_sticky(card.id);
			return v;
		};
	})();
		
	// For some reason the sticky notes disappear when the card is opened.
	// Specifically, it happens after the comments are finished loading.
	// Not sure why this happens but this is a quick band-aid fix.
	(function() {
		var proxied = card.view.showDetail;
		card.view.showDetail = function() {
			var v = proxied.apply(this, arguments);
			$(".js-close-window").click( function(){Models.Board.get(id).view.renderLists()} );
			return v;
		};
	})();
		
	// When cards are changed on the client side, they revert back to how they were before the
	// change while they send the data to the server.  The server then sends the changes back
	// and they are made again in the client.  During the time that this is happening, the notes disappear.
	// The responsible function is card.ready()  Overriding it allows us to show the notes immediately
	// after the card "reverts."  Disabling the "revert" functionality completely allows the notes
	// to keep focus even as the list is changed.
	(function() {
		var proxied = card.ready
		card.ready = function() {
			//var v = proxied.apply(this, arguments);
			card.view.render();
			//return card;
		 };
	})();
	
	card.view.render();
}

// Override the board-level Trello functions that would normally cause the notes to disappear.
function modify_board() {
	// If the card.view isn't ready yet, try again in 100ms
	if (!Models.Notification || !Models.Card || !Models.Board.get(id) ) {
		setTimeout(modify_board,100);
		return false;
	}

	// Cards are re-drawn when notifcations appear
	(function() {
		var proxied = Models.Notification.add
		Models.Notification.add = function() {
			var v = proxied.apply(this, arguments);
			Models.Board.get(id).view.renderLists()
			return v;
		 };
	})();
	
	// Cards are re-drawn when notifcations are cleared
	(function() {
		var proxied = Models.Card.add
		Models.Card.add = function() {
			var v = proxied.apply(this, arguments);
			modify_card(arguments[0].id);
			return v;
		 };
	})();
	
	// Cards are re-drawn when notifications are cleared.  Instead of overriding a function, this one
	// can be done by binding to an event.  Binding to events is preferable whenever possible.
	Models.Notification.bind("change",function(e){
		Models.Board.get(id).view.renderLists();
	})

}


function initStickyPlugin() {
	// Prepare the Board for the plugin
	modify_board();

	// Prepare the Cards for the plugin
	$.each( Models.Board.get(id).listList.models, function(index,list) {
		$.each( list.cardList.models,function(index,card) {
			modify_card(card.id);
		});
	});
}
*/

