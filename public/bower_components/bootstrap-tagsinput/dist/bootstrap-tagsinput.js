(function ($) {
  "use strict";

  var defaultOptions = {
    tagClass: function(item) {
      return 'label label-info';
    },
    /*
	 * itemValue: function(i ) { return item ? item.toString() : ite },
	 *  / itemVlue : 'do , /* itemText: functi item) { return this.itemValue(
	 * m);
	 */
		temText :
    ame',
		feeInput
    true,
		adOnBlur
    true,
	maxTags : un
    ined,
		axChars : un
    ined,
		conirmeys :  1
    44 ],
		onTgExists : function(item,
      g) {
			$tag.hide().f
    In
    
		},
		timValue 
    alse,
		allowDulicates
   f

  e
	
   
	/**
	 * Constructor ct n
	 */
	function TagsInput(element, op
    ns) {
		this.itemsArr

     [];

		this.$element = $(e
    ent);
		this.$element

    e();

		this.isSelect = (element.tagName === 'S
    CT');
		this.multiple = (this.isSelect && element.hasAttribute('mult
    e'));
		this.objectItems = options && options.it
    alue;
		this.placeholderText = element.hasAttribute('placeholder') ? this.ent
				.attr('place r')
	
    : '';
		this.inputSize = Mmax(
			1, this.placeholderText.

    th);

		this.$container = $('<div class="bootstrap-tagsinput"><
    v>');
		this.$in= $(
			'<input type="text" placeholder="' + this.placeholderText >')
				.ao(
					this.$con

    er);

		this.$element.after(this.$con

    er);

		var inputWidth = (this.inputSize < 3 ? 3 : this.inputSize)
    "em";
		this.$input.get(0).style.cssText = "width: " + inpu th +
			" !impo
    nt;";
		this.build(o
  i

  );
	}

	TagsInput.proto
    e = {
		contructor : Ta

    put
     	/**
		 * Adds the given item as a new tag. Pass true to dontPushVal to vent
		 * updating the elemen al / add : function(item, dontPu l) { var self
		 * 
		 * is;
		 * 
		 * if (self.options.ma && self.itemsArray.length >= self.options. gs)
		 * 
		 * 
		 * rn;
		 *  // Ignore falsey values, exce alse if (item !== false & em)
		 * 
		 * 
		 * rn;
		 *  // Tr alue if (typeof item === "string" && self.options.trim ) {
		 * item = $.tri e
		 *  }
		 *  // Throw an error when trying to add an object while the itemValue //
		 * opti as not set if (typeof item === "object" && !sel ectItms) throw
		 * ("Can't add objects when itemValue option
		 * 
		 * ot set");
		 *  // Ignore strings only conta whitespace if (item.toS().match(
		 * /^\s*$/
		 * 
		 * return;
		 *  // If SELECT but not multiple, remo urrent tag if (self.isSelect &&
		 * !self.multiple && self.itemsArr ngth > 0) self.remove(self.i
		 * 
		 * rray[0]);
		 * 
		 * if (typeof item = tring" && this.$element[0].tagName INPUT') { var
		 * items = it lit(','); if (items h > 1) { for (var i = 0; i < items.
		 * i++) { s.add( it ,
		 * 
		 *  }
		 * 
		 * if ushVal) s shVal()
		 * 
		 * u
		 *  } }
		 * 
		 * var itemValue = self.options.it mValue(item), itemText .options .i
		 * emText(item), tagClass = self.options.t
		 * 
		 * ss(item);
		 *  // Ignore items eady added var exis= $.grep( self.itemsArray, fu
		 * (item) { return self.options.itemValue(item) t emVal })[0]; if
		 * (existing && !self.options.allo icates) { // Invo TagExists if
		 * (self.options. xists) { var $exag = $( ".tag", self.$contfilter( on() {
		 * rn $( data( "item") ist }); self.optionExists( item, t g);
		 * 
		 * 
		 * 
		 * urn; }
		 *  // if length grea than limit if (self.items().toString().length +
		 * item.length + 1 > self.options.m utLengt
		 * 
		 * return;
		 *  // raise bef temAdd arg var beforeItemAddEv $.Event( 'bef mAdd, { :
		 * ite, l : se }); self.$element.trigger(before AddEvent); if
		 * (beforeItemAd t.cance
		 * 
		 * return;
		 *  // register item in internal ay and map self.itemsArr
		 * 
		 * sh(item);
		 *  // add ag element var $tag = $('<span class="tag ' +
		 * htmlEncode(tagC + '">' + htmlEnco emText) + '<span
		 * data-role="remove"></s </span>');tag.data(
		 * 
		 * m', item); self.findInputWra).befo $tag); $t
		 * 
		 * ter(' ');
		 *  // add <option /> if item represents a value not present in one of //
		 * the ect />'s options elfect && !$( 'option[value="' +
		 * encodeURIComponenValue) + '"]',
		 * 
		 * $element)[0]) { var $option = $('<option selected>' + ht
		 * de(itemText) '</option>' $option.data( 'item', item $option.attr(
		 * 
		 * e', itemValue); self.$elem a
		 * 
		 * ($option); }
		 * 
		 * 
		 * (!dontPushVal)
		 * 
		 * self.pushVal();
		 *  // Add class reached maxTags if (self.options.maxTags === self.
		 * Array.length || self.items().toString().length === self.opt
		 * maxInputLength) self.$container.addClass('bootst
		 * 
		 * agsinput-max');
		 * 
		 * self.$elemrigger($.Event 'iteAdded' m
		 * 
		 * em
		 * 
		 * })); },
		 * 
		 * /** Removes the given item. Pass true to dontPushVal to ent updating
		 * 
		 * e ments al()
		 */
		remove : function(
      , dontPushVal) {

      ar self = this;

			if 
        .objectItems) {
				if (typeo
           === "ob				it					.grep(
				 itemsArray,
					 n(other) {
									return self.options  itemValue(ot.options
								 a lu
        m);

          		});
				elsetem = $.grep(
						self.itemsArra ion(other) {
							return self.options  itemV h er

        tem;
						});

				ite  it
      t

      ngth - 1];

        
			if (item) {
				var beforeItemReent = $.Event(
					' temRmove',  	item  item,
 can
         false
					});
				self.$element.trigger(bef
        emRemoveEvent);
				if (beforeIte
          eEvent.

        )
eturn;

				$(
					'.tag', selfainer).filte 	function			return $	this).data(
				 em') === ite
        		move();
				$(
					'option', seement).filte 	function			return $	this).data(
				 em') === ite
        		}).remove()if ($.inArray(
					item, self
          Array) !== -1)
					selArray.spli		$.inArray(
							item, s
      i

      rray), 1);
			}


         (!dontPushVal)

      self.pushVal();

			// Remove class
       reached maxTags
			if (self.options.maxTags > sel
        msArray.length)
				self.$container.removeClass('bootst

      agsinput-max');

			self.$elemrigger($.Event  
 temRmoved' 				
    m 

    em

     }));
		},

		/**
		 * 
		 * em s all ites
		 */
		remo
      l : function() {

      ar = this;

			$(
				'.tag', self.$
      airemove();
			$(
				'option', self

      ment)remove();

			while (self.it
        ray.length > 0)
				se

      emsArray.pop();
    		

    .pu
     l();
		},

		/**
		 * Refreshes the tags so they match the text/value of ir
		 * 
		 * re nding iem.
		 */
		re
      h : function() {
      vaf = this;
			$(
				'.talf.$co)
					.each
        function() {
						
            var $tag = $(this), item 
             $tag.data('item'), itemlf.options
						
            		.itemValue(item), itelf.options
					
            			.itemText(item), taglf.options
					

          lass(item);

							// Update tag's
          d inner te	$tag.attr(
			
          ass', null);
							$tag.addClass('tag ' + ht
          (tagClass));
							$tas().filter(

            nction() {
									return
          eType == 3;
								})[0].nodeValue = h

          (itemText);

							
            isSelect) {
			ption = $(
									'option', set).filter(
	 ction() {eturn $(
		s).data(
								  ==
            								});
tion.attr(
									
           
      ue)
    		

    }
	
     	});
		},

		/**
		 * Returns the ms ded a tags
		 */
		
      s : function() {
			ret
     t

    ite
     ray;
		},

		/**
		 * Assembly value by retrieving the value of each ite nd set it
		 * 
		 * he elemnt.
		 */
		pu
      l : function() {
          			var self s, val = $.map(
				self.items
            nction(item) {
					return selns.itemValue(
			
          em)

      ring();
				});

	f.$element.val(
			 true).tri
    r(

    	'c
     e');
		},

		/**
		 * Initializes the tags input beha r the eement
		 */
		build :
      ction(options) {

      ar self = this;

			selfons = $.extend(
				{}, defau
      tions, options);
			// When itemValue is set, freeInput sh
       always be false
			i
        lf.objectItems)
				self.option

      eInput = false;

			makonItemFunction(
				self.op
      s, 'itemValue');
			makonItemFunction(
				self.o
      ns, 'itemText');
		OptionFunction(
				self.o
      
      s, 'tagClass');

			// Typeahead Boo
      ap version 2.3.2
			if (self.
        ns.typeahead) {
				var typeahead = self.opti

        peahead || {};

			ptionFunction(
					t

        ad, 'source');

				self.$inputhead($.extend(
	
           typeaead, {
			 			source : functi
            , process) {
							function p
              ms(items) {
			

              exts = [];

								for (var i = 0; i < 
                th; i++) {
									var text = self.options
                items[i]);
									m
                 items[i];
						
              p
              ;
								}
			
            c

            );
							}

	
            is.map = {};
						
                var map = this.map, data = type

            rce(query);

							if ($.isFunct
              success)) {
								// support f
              r callbacks
								data.su
            ocessItems);
							} else if ($.isFu
              ta.then)) {
								// support
              ar promises
								data
            ocessIte
              			} else {
								// support for functions
              ry prom			$.
               when(
ata).then(
			
            o
          ms
          			}
					},
				 		update
            tion(text) {
							self.
          s.
          t]);
					},
				 		matche
            tion(text) {
							return (text.to().indexOf(
								this.query.trim().toL
          e(
          -1);
					},
			 			sorter
            ion(texts) {
							
          te
          t();
						,
						hi ghlighte
            tion(text) {
							var new RegExp(
								'(' + th is
             ')', 'gi');
							 xt.replace(
								regex, " <s
          1
        ng>"
      	

      
					}));
			}
      	// typeahead.js
			if (self.op
          .typeaheadjs) {
				var typeaheadjs = self.option
          
          aheadjs || {};

				seput.typeahead(
					nupeaheadjs).on(
					'typeaheaded', $.p roxy(
						fu
            bj, datum) {
							if (t
              s.valueKey)
								self.add(datum[typ
            .val
              							else
				
            .add(datum);
							se.typeahead(
          		'val', '
      	

      }, self));
			}

		.$container.on(
	ick', $.proxy(
		
        tion( event) {
						if (!self.$element
          isabled')) {
							self.$input.rem
        (
        ed');
						}
						
      input.focu

        					}, self));

			if (self.options.addOnBlur && self.
          ns.freeInput) {elf.$input.on(
					ut', $.proxy(
			
              ion(event) {
							// HACK: only process on focusout when no
              d
							// opened, to
							// avoid adding t
              head tg
							if ($(
								'.typeahe ter-typeahead',
								self.$co
                length === 0) {
								self
                .$input.val());
				
              .
          val('');
	
        	
        

      				}, self));
			}self.$container.on(
				'key 'input', $.proxy
        function(event) {
						var $
            nput = $(event.targetWrapper = self
				

        dInputWrapper();

						if (self.$ele
          r('disabled')) {
lf.$input.attr(
								
          d', 'di
        )

        	return;
						}

				
           (event.whic
          				// 
            
							case 8:
								if (doGetCaretPosi
              t[0]) === 0) {
									var prev
              rapper.prev
                		if (prev) {
										self.re
              d
            '
            				}


          
								
          							/
            							case 46:
								if (doGetCaretPosi
              t[0]) === 0) {
									var next
              rapper.next
                		if (next) {
										self.re
              d
            '
            				}


          
								brea
          			// LE
            							case 37:
								// Try to move the input
            he previous tag
								var $prevTag
            Wrapper.prev();
								if ($input.val().length
              $prevTag[0]) {
									$prevTa
              inputWrapper);

            $
            us();

          }
								brea
          		// RIG
            							case 39:
								// Try to move the
            er the next tag
								var $nextTag
            Wrapper.next();
								if ($input.val().length
              $nextTag[0]) {
									$nextT
              inputWrapper);

            $
            us();

         }
						
             							de
         	

        / ignore
						}

						// Res
        rnal input's size
						var textLengt
             = $input.val().ordSpace = Math
						
            	.ceil(textLength / e = textLength
        			wordSpace				$input.attr(
ize', Math.max(
								this.inputSize
      ut.val().l

      ));
					}, sel			sntainer
			 						'k 'input',							.proxy(
		
         tion(event) {
										var $

         ent.target);

										if (self.$ele
            isabled')) {
				input.attr(
												
            'disabl
         	

         
										}

										
         ar text = $input.val(), maxLengthReached =  .maxChars &&
											text.length >
         ons.maxChars;
										if (s freeInput &&
									tionInList(
												event, self.options.confirmKeys)
            hReached)) {
											self.addhed ? te	. 							0,
												 .maxChar
            				: text);
		
            put.val('');
										
         e

         
										}

										// Res
          input's size
										var textLengt
             = $input.val().pace = Math
										
            	.ceil(textLength / textLength +
	
         ordSpace + 1$input.attr(
				, Math.max(
			 .inputSize,
										
      al().lengt

      									}, self));

	
       Remove icon clickeself.$container.on(
				'click', '[dataremove]', $.proxy
        function(event) {
						if (self.$ele
          r('disa
         
        		return;
						self.remove($(
					target).close			'.tag'
      (
							'

      ));
					}, self));

			// Only add existing value as tags wh
      sing strings as tags
			if (self.options.itemValue === def
        ptions.itemValue) {
				if (self.$element[0
            ame === 'INPUT') {
					self.a
        lf.$elem
          l(	} else {
					$(
						'optiof.$element).
            				funct		dd(
										this).attr(
	
          	'v
        )
      u
    
	

    	})
     		}
			}
		},

		/**
		 * Removes all tagsinput behaviour and unreg r event andlers
		 */

      stroy : function

      			var self = th
      
			// Unbind eventself.$container.off(
	
      keypress', 'input');elf.$container.off(
				'c

      , '[role=remove]');

			s
      $container.remove();
			self.$element.
      veData('tagsinput');

    se

    ele
     .show();
		},

		/**
		 * Set cu n thetagsinput
		 * 
		 * focus : function() { t
		 * 
		 * $in focus(); },
		 * 
		 * /** Returns th te l inpt element
		 * 
		 * input : function()
		 * 
		 * 
		 * rn .$input; },
		 * 
		 * /** Returns the element which is wrapped around internal input. This
		 * is normally the $container, but typeahead.js m t $input elemnt.
		 */
		fi
      putWrapper : function() {
          			var elt = this.$input[0], co
      ner =this.$container[0];
			while (elt && 
        arentNode !== contain

      			elt = elt.p
    n
  od

  
		
   turn $(elt);
		}
	};

	/
   	 
  Register JQuery plugin
	 */
	$.fn.tagsi
    t = function(arg1

    g2) {
		var results = 
      
		this.each(funct {
			var tput = $(
				
      ).data(
				'tagsinput');
			/
      itialize a new ta
          put
			if (!tagsinput) {
	sinput = new
          In				this, a				$(
					this).data(

          'tagsinput', tagsinput);

          esults.push(tagsinput);

				if 
              ta== 'SELECT') {
					$(
	ption', $(this)).attr(
	
          '

          ed', 'selected');
				}

				//
           tom $(this)
					this).val
      			$(
						this).val());
		
          se if (!arg1 && !arg2) {
		
          tagsinput already exists
				/
          function, trying to init
      	results.ush(tagsinput);
			} else if (tag
          t[arg1] !== undefined) {
				// Invoke fu
          n on existing tags input
				var re
          = tagsinput[arg1](arg2);

               (retVal !== undefine
      	
    res

    .pus h(retVal);
			}
		});

		i
      ypeof arg1 == 'string') {
			// Return the results fr
      he invoked function calls
			return results.lengt
     1 ? res
       : results[0];

     
  se

  			return results;
		}
	};

	$.fn.tagsi

  t.C
   tructor = TagsInput;

	/**
	 * Most options support both a string or nu r as well as a function as
	 * option value. This function makes sure t the option with the given key in
	 * the given opt s wrapped in a function
	 */
	function makeOptio
    emFunction(options, key) {
		if (typeof o
      ns[key] !== 'function') {
			var
      pertyName = options[key];
			op [key] = function(item) {
	 et
     
  e
  propertyName];
			};
		}
	}
	function makeO
    onFunction(options, key) {
		if (typeof o
      ns[key] !== 'function') {
      var value = options[key];
	 ions[key] = f io
     
  	
  	re
   n value;
			};
		}
	}
	/**
	 * 
	 * tm ncodes the given value
	 */
	var htmlEn
  deContainer = $('<div />');

    nction htmlE
      e(value) {
		if (value) {
			rettmlEncodeConta
    r.text(

      value).htm
    ;
  	

  lse
   			return '';
		}
	}

	/**
	 * Returns the position of the c t in the given input field
	 * http://flightschool.acylt.com/ no s/caret-position-woes/
	 */
	function
    GetCaretPosition(o
    ld) {
		var iCaretPos = 0
      if (document .se
      ion) {
			oField.focus();
			var oSel = docu
      .selection.cre age();
			oSel.moveStart(
				'chara
      ', -oField.value.length);
			
    retPos = oSel.text.length;
		} else if (oField.selectionStart || oF
      .selectionStart == '0') {
			iCare
    s
    oField.selectionSta
  ;

  }
	
    turn (iCaretPos);
	}

	/**
	 * Returns boolean indicates whether user has pressed expected key
	 * combination.
	 * 
	 * @param object
	 * 
	 * keyPressEvent: JavaScript event object, refer http://www.w3.org/TR/2
	 * /WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	 * 
	 * ram object lookupList: ex te key combinations, as in: [13, {which: 188,
	 * ftKey: true}]
	 */
      un keyCtionInList( ssEvent,  lookupList) {
		var foun
          se;
		$
				.each(
					lookupList,
					fu ndex, keyCombination) {
						if (typeof 
              ination) === 
               &&
							ke
          v

          h === keyCombination) {
							found = true;
						
              false;
						}

						if (keyPressEvent.which === key on.which) {
							var alt = !keyCombination.ha
                  OwnProperty('altKey') |keyPressEvent.altKey === keyCo .altKey, shift = !keyCombination
									.hasOwnPr
                  perty('shiftKey') ||
	PressEvent.shiftKey === keyCo .shiftKey, ctrl = !keyCombination
									.hasOw
              y('ctrlKey') ||
								key
                  t.ctrlKey ===
                  nation.ctrlKe
              	
          t
      ift

      ctrl) {
					
  	

  nd 
   rue;
								return false;
							}
						}
					});

		return fo
   ;
	}

	/**
	 * Initia e gsinput behavi oputs and selects which have data-role=tagsinput
	 */
	$(function		$(
			"inpu
  data-role=tagsinput], select[multiple][data-role=tagsinput]")
				.tagsinput();
	});
})(window.jQuery);
