
// DIGITAL PULP ASSIGNMENT NOTES in no particular order


1. Thanks, this was fun -- I put together several smaller pieces I had done worked out previously into one working thing, and clarified for myself how some things work that I hadn't been clear on before.


2. Because I wanted to give you a relatively complete picture of how I currently do stuff, I confess to spending more than 8 hours on this, but not too much.  For similar reasons, I kept a billing breakdown for reference: 

	• analysis, research & planning: 1.5 hrs
	• getting working functionality: 8 hours
	• applying styles/tweaking UI: 4 hours


3.  I hadn't ever used HTML5 for storage, so was happy to dig in into that bonus question for my own edification as well.  This uses the localStorage capability rather than the actual SQL stuff, as it appeals more to my Mongo/JSON sensibilities as well as appearing to be most cross-browser at a quick read.


4. I'm used to using validate.js and also parsley for validation, but I thought I would try to do this with just whats readily available in HTML5 for a change, in the intersts of keeping it simple, spare and again teaching myself something I wasn't exactly sure of before, so this validated the Contact name as 'required' and both email and URL for format, but no other fields.
I've written custom stuff for phone numbers, credit cards, etc on complex forms before, as well as supplying data to the list/select elements like state, country, etc.  I didn't get to that requirement here, mainly because I already know how to do it and was more interested in the other stuff.


5. I didn't do dialogue boxes for editing becuase I felt the user didn't need a third experience in interests of brevity and clarity. (I'm counting the display of existing contacts as 1st experience and the complete 'add new' as 2nd experience).  Plus, 'recycling' of form code/experience was natural by-product of object-oriented approach which I try to do now every chance I get.

6. I didn't do icons or any of that type of stuff becuase I figured you already know I can do all that as either font or images and have experience creating for retina with either.  I'm reasonably expert on the SASS spriting process, so could have gone either way with that.

7. I used SASS to style because its whats fastest for me and what I'm most invested in these days as a CSS tool.


8. This is built with repsonsive styles because I've made a personal practice of doing everything with at least a repsonsive foundation so that 1) nothing I make now shouldn't ever have to be trashed and redone from the ground up later on becuase of its own shortcomings and 2) because I'm still making the move in my head to 'mobile first' and can use all the practice I can get :)


9. The javascript insertion method is based on something by Paul Irish that a peer turned me onto at Sapient.  I've been adapting it for a slightly different purpose in the dev tool I'm making for ESPN, and just copied that whole structure over as a means of 1) not changing my current context too much as I took this on and 2) giving myself another environment/purpose to use it in.

10. This should be pretty cross-browser as far as it goes, but I confess to not testing it on anything but Chrome, which I develop in using Sublime as a text editor and MAMP as local server environment.

11. Stuff that still sucks: no organization/pagination of displayed contacts. Would at least alphabetize next.

12. Stuff that still sucks: no cancel option on the entry-form slide in. 

13. Stuff that still sucks: when editing a current item, need to move the event of removing old entry from the object to be rewritten in localStorage.  In combo with #12 above, makes ripe opportunity to delete contacts by mistake.

14. Stuff that still sucks: No search/sort feature yet.  Thinking I would use isotope.js next and then un-force the contact box height matching for a masonry type layout.




