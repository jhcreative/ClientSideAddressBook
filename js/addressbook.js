// ADDRESSBOOK JS NAMESPACE 
var $jQ = 	jQuery.noConflict();
			AB = {},
			UTIL = {};

var AB = {

	common : {
		init : function() {


		// 'SAVED CONTACTS' OBJECT
		var getExisting = localStorage.getItem('savedContacts');

		if(getExisting !== null && getExisting.length > 1) {
			//alert('existing');
			// intentionally global
			savedContacts = JSON.parse(getExisting);
		} else {
			// intentionally global
			//alert('not-existing');
			savedContacts = [];
		}
		console.log(savedContacts);
	    	
		}
	// end common
	},
	"ab_display-section" : {
		init : function() {

			// DISPLAY EXISTING CONTACTS
			if($jQ(savedContacts).length > 0) {
				$jQ('.display_contacts').find('p').remove();
				AB.displayContacts();

				// var for common height calc
				var thisContactHeight = 0,
					setHeight = 0;

				// add css class for physical addresses only
				$jQ('.ab_contact').each(function(i, el){
					var thisContact = $jQ(el),
						theseLabels = thisContact.find('.ab_label');

					$jQ(theseLabels).each(function(i, el){
						var labelContent = $jQ(el).html();

						if(	labelContent.indexOf('street') >= 0 
							|| labelContent.indexOf('city') >= 0
							|| labelContent.indexOf('state') >= 0  
							|| labelContent.indexOf('postcode') >= 0 
							|| labelContent.indexOf('country') >= 0  ){ 

							$jQ(el).html(' ').addClass('inline'); 
							thisContact.addClass('has-address');
						} else {
							$jQ(el).addClass('one-line');
						}
					});

					thisContactHeight = parseInt(thisContact.css('height'), 10);
					if(thisContactHeight > setHeight) {
						setHeight = thisContactHeight;
					}
				});

				// set common height
				$jQ('.ab_contact').each(function(){
					$jQ(this).css('height', setHeight + 'px');
				});


				// add non-custom 'address' label if neccessary
				$jQ('.ab_contact.has-address').each(function(i, el){
					var findCustom = $jQ(el).find('h5').length;
					if (findCustom < 1) {
						var here = $jQ(el).find('.ab_content').first();
						$jQ('<div class="ab_label address-label">Address</div>').insertAfter(here);
					}
				});

				// finally, remove redundant labels
				$jQ('.display_contacts .address-label').each(function(){
					$jQ(this).next().remove();
				});
			}


			// 'REMOVE' CLICK
			$jQ('.remove-contact').on('click', function(){
				var thisContactName = $jQ(this).parents('.ab_contact').find('.ab_content').first().html(),
					confirmBox = confirm('Are you sure you want to delete ' + thisContactName + ' from your Address Book?');
				if(confirmBox === true){
					// edit current array 
					savedContacts = $jQ.grep(savedContacts, function(obj, i){
										return obj.name_input === thisContactName;
									}, true);
					// save edited array
					localStorage.setItem('savedContacts', JSON.stringify(savedContacts));
					// empty current display
					$jQ('.ab_contact').each(function(i, el){
						$jQ(el).remove();
					});
					// refresh page
					location.reload(true);
				}
			});


			// 'EDIT' CLICK
			$jQ('.edit-contact').on('click', function(){
				var whichContact = $jQ(this).parents('.ab_contact').find('.ab_content').first().html();
				$jQ(savedContacts).each(function(i,el){
					if(el.name_input === whichContact){
						AB.createForm('edit', el);
					}
				});
				// switch form headlines
	    		$jQ('h2.add-form').addClass('off');
				$jQ('h2.edit-form').removeClass('off'); 

				// force scroll to top
  				$jQ("html, body").animate({ scrollTop: 0 }, "fast");
 				

				// slide in form, toggle display
				$jQ('#entry-form-section').toggleClass('in-use');
				$jQ('#entry-display-section').toggleClass('editing');

			});



			// 'ADD CONTACT FORM' CLICK
			$jQ('#get-add-form').on('click', function(){
				AB.createForm('add');

				// switch form headlines
	    		$jQ('h2.add-form').removeClass('off');
				$jQ('h2.edit-form').addClass('off'); 

				// force scroll to top
  				$jQ("html, body").animate({ scrollTop: 0 }, "fast");
 				
				// slide in form, toggle display
				$jQ('#entry-form-section').toggleClass('in-use');
				$jQ('#entry-display-section').toggleClass('editing');
			});


		}

	// end display section 
	},
	"ab_edit-section" : {
		init : function() {

			// SUBMIT ACTION
    		$jQ('form').submit(function(e) {
    			e.preventDefault();
      
				// slide out form 
				$jQ('#entry-form-section').toggleClass('in-use');

				// do the work
				var thisForm = $jQ('#entry-form'),
					theseFields = thisForm.find('fieldset'),
					saveObject = {};

				$jQ.each(theseFields, function(i, el){
					var theseInputs = $jQ(el).find('input');

					$jQ.each(theseInputs, function(i, el){
						var thisInput = $jQ(el);

						if(thisInput.hasClass('addl-entry') || thisInput.hasClass('submit')) {
							// ignore
						} else {
							var thisKey = thisInput.attr('id'),
								thisVal = thisInput.val();
							if(thisVal.length > 0) {
								saveObject[thisKey] = thisVal;
							}
						}
					});
				});
				savedContacts.push(saveObject);


				if ('localStorage' in window && window['localStorage'] !== null) {
					// save new contact
					localStorage.setItem('savedContacts', JSON.stringify(savedContacts));
					//alert('Saved!');
					// now refresh page
					setTimeout(function(){
						location.reload(true);
					}, 1000)
					
				} else {
					alert('Sorry, local storage not available in this browser.')
				}
			});
		}
	// end display section 
	},

	// FUNCTIONS
	createForm : function(formType, record){ 

		// get form structure
		var formEl;
		$jQ.ajax({
    		'async': false,
    		'global': false,
    		'url': 'js/form-inputs.js',
    		'dataType': "json",
    		'success': function (data) {
        		formEl = data;
    		}
		});

		$jQ.each(formEl.formInputs, function(i, el){
			var fieldsetHtml,
				fieldHtml;
				
			switch(i)
			{
				// name
				case 0:

					fieldsetHtml = '<fieldset id="name-fieldset"><h3>Name or Business Name</h3>';
					fieldHtml = AB.renderInput(el);
					fieldsetHtml = fieldsetHtml + fieldHtml + '</fieldset>';
					$jQ(fieldsetHtml).appendTo('#entry-form');

				break;


				// address
				case 1:
					fieldsetHtml = '<fieldset id="address_fieldset" data-num="1"><h3>Address</h3>';
					$jQ.each(formEl.formInputs[i].address, function(i, el){
						fieldHtml = AB.renderInput(el);
						fieldsetHtml = fieldsetHtml + fieldHtml;	
					});
					fieldsetHtml = fieldsetHtml + '<input type="button" onclick="AB.addEntry(this)" class="addl-entry" value="Add Another Address"></fieldset>';
					$jQ(fieldsetHtml).appendTo('#entry-form');

				break;


				// telephone
				case 2:

					fieldsetHtml = '<fieldset id="telephone_fieldset" data-num="1"><h3>Telephone</h3>';
					$jQ.each(formEl.formInputs[i].telephone, function(i, el){
						fieldHtml = AB.renderInput(el);
						fieldsetHtml = fieldsetHtml + fieldHtml;
					});
					fieldsetHtml = fieldsetHtml + '<input type="button" onclick="AB.addEntry(this)" class="addl-entry" value="Add Another Telephone"></fieldset>';
					$jQ(fieldsetHtml).appendTo('#entry-form');

				break;


				// email
				case 3:

					fieldsetHtml = '<fieldset id="email_fieldset" data-num="1"><h3>Email</h3>';
					$jQ.each(formEl.formInputs[i].email, function(i, el){
						fieldHtml = AB.renderInput(el);
						fieldsetHtml = fieldsetHtml + fieldHtml;
					});
					fieldsetHtml = fieldsetHtml + '<input type="button" onclick="AB.addEntry(this)" class="addl-entry" value="Add Another Email"></fieldset>';
					$jQ(fieldsetHtml).appendTo('#entry-form');

				break;


				// website
				case 4:

					fieldsetHtml = '<fieldset id="website_fieldset" data-num="1"><h3>Website</h3>';
					$jQ.each(formEl.formInputs[i].website, function(i, el){
						fieldHtml = AB.renderInput(el);
						fieldsetHtml = fieldsetHtml + fieldHtml;
					});
					fieldsetHtml = fieldsetHtml + '<input type="button" onclick="AB.addEntry(this)" class="addl-entry" value="Add Another Website"></fieldset>';
					$jQ(fieldsetHtml).appendTo('#entry-form');

				break;

			}

		});


	    if(formType === 'edit'){

			// get record and replace form values
			$jQ('#entry-form').find('input').each(function(i, el){
				var thisInput = $jQ(el),
					thisInputID = $jQ(el).attr('id'),
					thisContactName = record.name_input;
				console.log(thisContactName);
				// match fields
				if(record[thisInputID] !== undefined){
					thisInput.val(record[thisInputID]);
				}
				// remove old version from array
				savedContacts = $jQ.grep(savedContacts, function(obj, i){
					return obj.name_input === thisContactName;
				}, true);

			});
		}
	},
	renderInput : function(obj){
		//console.log(inputObj);
		var labelStr = '<label for="' + obj.name + '">' + obj.label + '</label>',
			inputStr = '<input id="' + obj.id + '" name="' + obj.name + '" type="' + obj.type + '" placeholder="' + obj.value + '"',
			inputHtml;

		if(obj.required === "true") {
			inputStr = inputStr + 'required />';
		} else {
			inputStr = inputStr + '/>';
		}

		inputHtml = labelStr + inputStr;
		return inputHtml;

	},
	addEntry : function(addNew){
		var copyThis = $jQ(addNew).parent('fieldset'),
			copyThisID = Number(copyThis.attr('data-num')),
			newCopyID = copyThisID + 1,
			newCopy = copyThis.clone().attr('data-num', newCopyID),
			newFieldsetID = newCopy.attr('id');

		// remove clicked button
		$jQ(copyThis).find('.addl-entry').remove();

		// edit fieldset ID
		newFieldsetID = AB.newValue(newFieldsetID, newCopyID);
		newCopy.attr('id', newFieldsetID);
		
		// edit new h3
		$jQ(newCopy).find('h3').each(function(i, el){
			var editThis = $jQ(el),
				value = editThis.html(),
				value = AB.newValue(value, newCopyID);
			editThis.html(value);
		});

		// edit new labels
		$jQ(newCopy).find('label').each(function(i, el){
			var editThis = $jQ(el),
				value = editThis.attr('for');
				value = AB.newValue(value, newCopyID);
			editThis.attr('for', value);	
		});

		//edit new inputs
		$jQ(newCopy).find('input').each(function(i,el){
			if($jQ(el).hasClass('addl-entry')){
				//skip
			} else {
				var editThis = $jQ(el),
					editName = editThis.attr('name'),
					editID = editThis.attr('id');
					//placeholder = editThis.attr('placeholder');

				// create new name
			 	editName = AB.newValue(editName, newCopyID);

				//create new id
				editID = AB.newValue(editID, newCopyID);

				// edit the inpiut
				editThis.attr('id', editID).attr('name', editName).val('');
			}
		});
		// insert new fieldset
		$jQ(newCopy).insertAfter(copyThis);
	},
	newValue : function(val, id){
		val = val.split("-");
		val = val[0];
		val = val + "-" + id;
		return val;
	},
	displayContacts : function(){
		$jQ.each(savedContacts, function(i, el){
			var thisContact = $jQ(el)[0],
				customLabel = 0,
				key,
				displayKey,
				contactStr = '<div class="ab_contact">',
				buttonStr = '<button class="remove-contact">Remove</button><button class="edit-contact">Edit</button>';

			for (key in thisContact){
				if (thisContact.hasOwnProperty(key)){
					// process key for display 
					var keyPcs = key.split('_'),
						keyPcsLabel = keyPcs[1],
						keyPcsLast = keyPcs.length - 1;

					// add elements for physical address custom labels
					if( keyPcs[0] === 'address'){
						contactStr = contactStr + '<h5 class="address-label">' + thisContact[key] + '</h5>'; 
					}

					// test for custom label
					if(keyPcsLabel === 'label'){ // skip
						// get value, don't append
						customLabel = thisContact[key];

					} else {
						//test if customLabel has value 
						if(customLabel !== 0){
							displayKey = customLabel;
							customLabel = 0;
						} else {
							// no custom label, set default
							displayKey = keyPcs[0];

							// test for add'l entries & edit displayKey if so	
							if(keyPcs[keyPcsLast] !== 'input'){
								// this is add'l, first split for # 
								var addlSplit = keyPcs[keyPcsLast].split('-'),
									addlNum = addlSplit[1];
								displayKey = displayKey + '-' + addlNum;
							}
						}
						var labelStr = '<div class="ab_label">' + displayKey + '</div>',
							contentStr = '<div class="ab_content">' + thisContact[key] + '</div>';

						contactStr = contactStr + labelStr + contentStr;
					}
				}
			}
			contactStr = contactStr + buttonStr + '</div>';
			$jQ(contactStr).appendTo('.display_contacts');
		});

	}



	
};


// MARK UP BASED EXECUTION ADAPTED FROM PAUL IRISH EXAMPLE

UTIL = {
	fire : function(func, funcname, args) {

		var namespace = AB; // indicate obj literal here
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
			namespace[func][funcname](args);
		} else {
			//console.log(funcname);
		}

	},
	loadEvents : function() {
		var sections = $jQ('section'),
			sectionNames = [],
			sectionsLoaded = [];

		$jQ.each(sections, function(i, el){
			var thisData = $jQ(this).attr('class');
			sectionNames.push(thisData);
		});
		//console.log(sectionNames);
		UTIL.fire('common');
		$jQ.each(sections, function(i, thisSection){
			if(sectionNames[i] === undefined){
				// sanity check for sections without functions
			} else if(sectionsLoaded.indexOf(sectionNames[i]) > -1){
				// sanity check for repeats
			} else {
				UTIL.fire(sectionNames[i]);
				sectionsLoaded.push(sectionNames[i]);
			}
			//console.log(sectionsLoaded);
		});
		UTIL.fire('common', 'finalize');
	}
};


// INITIALIZE

$jQ(document).ready(UTIL.loadEvents);





