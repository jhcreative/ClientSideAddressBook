{
	"formInputs" : [

		{ 	"label" : "Name",
			"id" : "name_input",
			"name" : "entry_name",
			"type" :  "text",
			"value" : "first/last or business name",
			"required" : "true"	
		},

		{ 	"address" : [

				{ 	"label" : "Label",
					"id" : "address_label_input",
					"name" : "entry_address_label",
					"type" :  "text",
					"value" : "home, work, etc",
					"required" : "false"
				},

				{ 	"label" : "Street",
					"id" : "street1_input",
					"name" : "entry_street1",
					"type" :  "text",
					"value" : "street address",
					"required" : "false"
				},

				{ 	"label" : "",
					"id" : "street2_input",
					"name" : "entry_street2",
					"type" :  "text",
					"value" : "apt, unit, etc",
					"required" : "false"
				},

				{ 	"label" : "City",
					"id" : "city_input",
					"name" : "entry_city",
					"type" :  "text",
					"value" : "city",
					"required" : "false"
				},

				{ 	"label" : "State",
					"id" : "state_input",
					"name" : "entry_state",
					"type" :  "text",
					"value" : "state or province",
					"required" : "false" 
				},

				{ 	"label" : "Postal Code",
					"id" : "postcode_input",
					"name" : "entry_postcode",
					"type" :  "text",
					"value" : "postal code",
					"required" : "false"
				},

				{ 	"label" : "Country",
					"id" : "country_input",
					"name" : "entry_country",
					"type" :  "text",
					"value" : "country",
					"required" : "false" 
				}
			]
		},

		{ 	"telephone" : [

				{ 	"label" : "Label",
					"id" : "telephone_label_input",
					"name" : "entry_telephone_label",
					"type" :  "text",
					"value" : "home, work, etc",
					"required" : "false"
				},

				{	"label" : "Telephone",
					"id" : "telephone_input",
					"name" : "entry_telephone",
					"type" :  "tel",
					"value" : "phone number with area code",
					"required" : "false"
				}
			]
		},

		{ 	"email" : [

				{ 	"label" : "Label",
					"id" : "email_label_input",
					"name" : "entry_email_label",
					"type" :  "text",
					"value" : "personal, work, etc",
					"required" : "false"
				},

				{ 	"label" : "Email",
					"id" : "email_input",
					"name" : "entry_email",
					"type" :  "email",
					"value" : "email address",
					"required" : "false"
				}
			]
		},

		{ 	"website" : [

				{ 	"label" : "Label",
					"id" : "website_label_input",
					"name" : "entry_website_label",
					"type" :  "text",
					"value" : "blog, LinkedIn, etc",
					"required" : "false"
				},

				{ 	"label" : "Website",
					"id" : "website_input",
					"name" : "entry_website",
					"type" :  "url",
					"value" : "website url",
					"required" : "false"
				}
			]
		}

	]
}