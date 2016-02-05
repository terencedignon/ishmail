# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'faker'

username = "mailer-daemon"
password = "guest0"
location = "United States of America"
gender = "M"
birthday= ["1987", "12", "1"]
fname = "Mail Delivery"
lname = "Subsystem"
daemon = User.create!(username: username, password: password, location: location,
  gender: gender, birthday: birthday, fname: fname, lname: lname)


  username = "mailer-daemon"
  password = "guest0"
  location = "United States of America"
  gender = "M"
  birthday= ["1987", "12", "1"]
  fname = "Mail Delivery"
  lname = "Subsystem"
  daemon = User.create!(username: username, password: password, location: location,
    gender: gender, birthday: birthday, fname: fname, lname: lname)


    username = "MarketWatch"
    password = "guest0"
    location = "United States of America"
    gender = "M"
    birthday= ["1987", "12", "1"]
    fname = "Mail Delivery"
    lname = "Subsystem"
    market_watch = User.create!(username: username, password: password, location: location,
      gender: gender, birthday: birthday, fname: fname, lname: lname)

      username = "Seamless"
      password = "guest0"
      location = "United States of America"
      gender = "M"
      birthday= ["1987", "12", "1"]
      fname = "Seamless"
      lname = ""
      seamless = User.create!(username: username, password: password, location: location,
        gender: gender, birthday: birthday, fname: fname, lname: lname)

  username = "terence_dignon"
  password = "guest0"
  location = "United States of America"
  gender = "M"
  birthday= ["1987", "12", "1"]
  fname = "Terence"
  lname = "Dignon"
  terence = User.create!(username: username, password: password, location: location,
    gender: gender, birthday: birthday, fname: fname, lname: lname)

  #
  # username = "dignonpterry"
  # password = "guest0"
  # location = "United States of America"
  # gender = "M"
  # birthday= ["1987", "12", "1"]
  # fname = Faker::Name.first_name
  # lname = Faker::Name.last_name
  # user = User.create!(username: username, password: password, location: location,
  #   gender: gender, birthday: birthday, fname: fname, lname: lname)
  #
  #
  #   User.all.each do |user|
  #     Email.create!(sender: "heybud", draft_set: false, user_id: user.id, subject: "Welcome to Ishmail", body: "wakka wakka")
  #   end



gender= "M"
location= "the_sea"
birthday = ["1987", "12", "1"]


username="whale"
password="guest0"
fname="whale"
lname=""

whale = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)


username = "ahab"
password = "guest0"
fname="Ahab"
lname=""

ahab = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username = "ishmael"
password = "guest0"
fname="CallMe"
lname="Ishmael"
gender="M"

ishmael = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username = "stubb"
password = "guest0"
fname="Stubb"
lname=""
gender="M"

stubb = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username = "queequeg"
password = "guest0"
fname="Queequeg"
lname=""
gender="M"

queequeg = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username = "starbuck"
password = "guest0"
fname="Starbuck"
lname=""

starbuck = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username = "bildad"
password="guest0"
fname="Bildad"
lname=""

bildad = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username="peleg"
password="guest0"
fname="Peleg"
lname=""

peleg = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username="pip"
password="guest0"
fname="Pip"
lname=""

pip = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username="dough_boy"
password="guest0"
fname="Dough"
lname="Boy"

dough_boy = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username="landlord"
password="guest0"
fname="Landlord"
lname=""

landlord = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username="boomer"
password="guest0"
fname="Boomer"
lname=""

boomer = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

###### create contacts

[ahab, boomer, landlord, dough_boy, pip, peleg, bildad, starbuck, stubb].each do |member|
  Contact.create!(user_id: ishmael.id, contact_id: member.id)
end



##conversation 1


subject = "The harpooner"
body = "Expect the harpooner this evening."
user_id = ishmael.id
sender =  landlord.username
draft_set = false

landlord_email = Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set)

subject = "re: The harpooner"
body = "Landlord! What sort of a chap is he—does he always keep such late hours?"
user_id = landlord.id
sender = ishmael.username
draft_set = false
parent_email_id = landlord_email.id

Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

body = "He pays reg'lar. But come, it's getting dreadful late, you had better be turning flukes—it's a nice bed; Sal and me slept in that ere bed the night we were spliced. There's plenty of room for two to kick about in that bed; it's an almighty big bed that. Why, afore we give it up, Sal used to put our Sam and little Johnny in the foot of it. But I got a dreaming and sprawling about one night, and somehow, Sam got pitched on the floor, and came near breaking his arm. Arter that, Sal said it wouldn't do. Come along here, I'll give ye a glim in a jiffy."
user_id = ishmael.id
sender = landlord.username
draft_set = false

Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


##message 3

subject = "Issued from the cabin"
body = "Now, Mr. Ishmael, are you sure everything is right? Captain Ahab is all ready—just spoke to him—nothing more to be got from shore, eh? Well, call all hands, then. Muster 'em aft here—blast 'em!"
sender = peleg.username
draft_set = false
parent_email_id = nil

Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

##message 4

subject = "The main-yards, ahoy!"
body = "Captain Bildad—come, old shipmate, we must go. Back the main-yard there! Boat ahoy! Stand by to come close alongside, now! Careful, careful!—come, Bildad, boy—say your last. Luck to ye, Starbuck—luck to ye, Mr. Stubb—luck to ye, Mr. Flask—good-bye and good luck to ye all—and this day three years I'll have a hot supper smoking for ye in old Nantucket. Hurrah and away!"
sender = starbuck.username
draft_set = false

Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

##message5

subject = "Whale oil & royalty"
body = "In behalf of the dignity of whaling, I would fain advance naught but substantiated facts. But after embattling his facts, an advocate who should wholly suppress a not unreasonable surmise, which might tell eloquently upon his cause—such an advocate, would he not be blameworthy?
It is well known that at the coronation of kings and queens, even modern ones, a certain curious process of seasoning them for their functions is gone through. There is a saltcellar of state, so called, and there may be a castor of state. How they use the salt, precisely—who knows? Certain I am, however, that a king's head is solemnly oiled at his coronation, even as a head of salad. Can it be, though, that they anoint it with a view of making its interior run well, as they anoint machinery? Much might be ruminated here, concerning the essential dignity of this regal process, because in common life we esteem but meanly and contemptibly a fellow who anoints his hair, and palpably smells of that anointing. In truth, a mature man who uses hair-oil, unless medicinally, that man has probably got a quoggy spot in him somewhere. As a general rule, he can't amount to much in his totality.
But the only thing to be considered here, is this—what kind of oil is used at coronations? Certainly it cannot be olive oil, nor macassar oil, nor castor oil, nor bear's oil, nor train oil, nor cod-liver oil. What then can it possibly be, but sperm oil in its unmanufactured, unpolluted state, the sweetest of all oils?
Think of that, ye loyal Britons! we whalemen supply your kings and queens with coronation stuff!"
sender = bildad.username
draft_set = false


Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


#message6
subject = "Knights and squires"
body =  "I will have no man in my boat who is not afraid of a whale."
sender = starbuck.username
draft_set = false


#message7
subject = "Am I a cannon-ball"
body = "Am I a cannon-ball, Ishmael? that thou wouldst wad me that fashion? But go thy ways; I had forgot. Below to thy nightly grave; where such as ye sleep between shrouds, to use ye to the filling one at last.—Down, dog, and kennel!"
sender = ahab.username
draft_set = false

ahab_email = Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject = "re: Am I a cannon-ball"
body = "I have never thought of you as a cannon-ball."
sender = ishmael.username
user_id = ahab.id
parent_email_id = ahab_email.id

Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


#message 8

subject = "Stubb's soliliquy"
body = "It's very queer. Stop, Stubb; somehow, now, I don't well know whether to go back and strike him, or—what's that?—down here on my knees and pray for him? "
sender = stubb.username
user_id = ishmael.id
parent_email_id = nil

stubb_email = Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)



subject = "re: I was never served so before..."
body = "Yes, that was the thought coming up in me; but it would be the first time I ever did pray. It's queer; very queer; and he's queer too; aye, take him fore and aft, he's about the queerest old man Stubb ever sailed with. How he flashed at me!—his eyes like powder-pans! is he mad? Anyway there's something on his mind, as sure as there must be something on a deck when it cracks. He aint in his bed now, either, more than three hours out of the twenty-four; and he don't sleep then. Didn't that Dough-Boy, the steward, tell me that of a morning he always finds the old man's hammock clothes all rumpled and tumbled, and the sheets down at the foot, and the coverlid almost tied into knots, and the pillow a sort of frightful hot, as though a baked brick had been on it? A hot old man! I guess he's got what some folks ashore call a conscience; it's a kind of Tic-Dolly-row they say—worse nor a toothache. Well, well; I don't know what it is, but the Lord keep me from catching it. He's full of riddles; I wonder what he goes into the after hold for, every night, as Dough-Boy tells me he suspects; what's that for, I should like to know? Who's made appointments with him in the hold? Ain't that queer, now? But there's no telling, it's the old game—Here goes for a snooze. Damn me, it's worth a fellow's while to be born into the world, if only to fall right asleep. And now that I think of it, that's about the first thing babies do, and that's a sort of queer, too. Damn me, but all things are queer, come to think of 'em. But that's against my principles. Think not, is my eleventh commandment; and sleep when you can, is my twelfth—So here goes again. But how's that? didn't he call me a dog? blazes! he called me ten times a donkey, and piled a lot of jackasses on top of that! He might as well have kicked me, and done with it. Maybe he did kick me, and I didn't observe it, I was so taken all aback with his brow, somehow. It flashed like a bleached bone. What the devil's the matter with me? I don't stand right on my legs. Coming afoul of that old man has a sort of turned me wrong side out. By the Lord, I must have been dreaming, though—How? how? how?—but the only way's to stash it; so here goes to hammock again; and in the morning, I'll see how this plaguey juggling thinks over by daylight."
sender = ishmael.username
user_id = ahab.id
parent_email_id = stubb_email.id
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


## message 9
subject = "The pipe."
body = "How now, this smoking no longer soothes. Oh, my pipe! hard must it go with me if thy charm be gone! Here have I been unconsciously toiling, not pleasuring—aye, and ignorantly smoking to windward all the while; to windward, and with such nervous whiffs, as if, like the dying whale, my final jets were the strongest and fullest of trouble. What business have I with this pipe? This thing that is meant for sereneness, to send up mild white vapours among mild white hairs, not among torn iron-grey locks like mine. I'll smoke no more—"
sender = ahab.username
parent_email_id = nil
user_id = ishmael.id
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

##message 10
subject = "A kick from Ahab."
body = "Such a queer dream, King-Post, I never had. You know the old man's ivory leg, well I dreamed he kicked me with it; and when I tried to kick back, upon my soul, my little man, I kicked my leg right off! And then, presto! Ahab seemed a pyramid, and I, like a blazing fool, kept kicking at it. But what was still more curious, Flask—you know how curious all dreams are—through all this rage that I was in, I somehow seemed to be thinking to myself, that after all, it was not much of an insult, that kick from Ahab."
sender = dough_boy.username
parent_email_id = nil
user_id = ishmael.id
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

#message11

subject = "Check out my latest song."
body = "Wouuuuu wouuu wou wou wouuuuuu wou click click wouuuu"
sender = whale.username
parent_email_id = nil
user_id = ishmael.id
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)



#message11

subject = "Clam or Cod"
body = "I will just take this here iron, and keep it for you till morning. But the chowder; clam or cod to-morrow for breakfast, men?"
sender = landlord.username
parent_email_id = nil
user_id = ishmael.id
clam_or_cod = Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject = "re: Clam or Cod"
body = "Both, and let's have a couple of smoked herring by way of variety."
sender = ishmael.username
parent_email_id = clam_or_cod.id
user_id = landlord.id
clam_or_cod = Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


#message12

subject = "Help out with my white whale Kickstarter"
body = "Thanks guys! I need a new dinghy for the expedition."
sender = ahab.username
user_id = ishmael.id
parent_email_id = nil
ahab_kickstarter = Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "re: Help out with my white whale Kickstarter"
body = "Thanks guys! I need a new dinghy for the expedition."
sender = ishmael.username
user_id = ahab.id
parent_email_id = ahab_kickstarter.id
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

#message 13



subject = "Working on my ship."
body = "Thou art speaking to Captain Peleg—that's who ye are speaking to, young man. It belongs to me and Captain Bildad to see the Pequod fitted out for the voyage, and supplied with all her needs, including crew. We are part owners and agents. But as I was going to say, if thou wantest to know what whaling is, as thou tellest ye do, I can put ye in a way of finding it out before ye bind yourself to it, past backing out. Clap eye on Captain Ahab, young man, and thou wilt find that he has only one leg."
sender = peleg.username
parent_email_id = nil
user_id = ishmael.id
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "Moby Dick?"
body = "Do ye know the white whale then, Tash?"
sender = ahab.username

subject = "Thoughts on Captain Peleg"
body = "thy conscience may be drawing ten inches of water, or ten fathoms, I can't tell; but as thou art still an impenitent man, Captain Peleg, I greatly fear lest thy conscience be but a leaky one; and will in the end sink thee foundering down to the fiery pit, Captain Peleg"
sender = bildad.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "Bounty on the whale"
body = "Whosoever of ye raises me a white-headed whale with a wrinkled brow and a crooked jaw; whosoever of ye raises me that white-headed whale, with three holes punctured in his starboard fluke—look ye, whosoever of ye raises me that same white whale, he shall have this gold ounce, my boys!"
sender = ahab.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)



subject = "Before you meet Ahab"
body = "Come hither to me—hither, hither.  Look ye, lad; never say that on board the Pequod. Never say it anywhere. Captain Ahab did not name himself. 'Twas a foolish, ignorant whim of his crazy, widowed mother, who died when he was only a twelvemonth old. And yet the old squaw Tistig, at Gayhead, said that the name would somehow prove prophetic. And, perhaps, other fools like her may tell thee the same. I wish to warn thee. It's a lie. I know Captain Ahab well; I've sailed with him as mate years ago; I know what he is—a good man—not a pious, good man, like Bildad, but a swearing good man—something like me—only there's a good deal more of him. Aye, aye, I know that he was never very jolly; and I know that on the passage home, he was a little out of his mind for a spell; but it was the sharp shooting pains in his bleeding stump that brought that about, as any one might see. I know, too, that ever since he lost his leg last voyage by that accursed whale, he's been a kind of moody—desperate moody, and savage sometimes; but that will all pass off. And once for all, let me tell thee and assure thee, young man, it's better to sail with a moody good captain than a laughing bad one. So good-bye to thee—and wrong not Captain Ahab, because he happens to have a wicked name. Besides, my boy, he has a wife—not three voyages wedded—a sweet, resigned girl. Think of that; by that sweet girl that old man has a child: hold ye then there can be any utter, hopeless harm in Ahab? No, no, my lad; stricken, blasted, if he be, Ahab has his humanities!"
sender = peleg.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject = "[MarketWatch] Whale oil down for fifth straight session"
body = "Whale oil markets were routed today on the announcement that stores had increased 5% YOY."
sender = market_watch.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "Your friend Queequeg"
body = "How did you meet him?"
sender = peleg.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject = "Lookee here"
body = "Morning to ye! Mornin to ye!"
sender = queequeg.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "Ishmael, are you ready?"
body = "Man the capstan! Blood and thunder!—jump!"
sender = ahab.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject="Avast the chorus!"
body = " Avast the chorus! Eight bells there! d'ye hear, bell-boy? Strike the bell eight, thou Pip! thou blackling! and let me call the watch. I've the sort of mouth for that—the hogshead mouth. So, so, (thrusts his head down the scuttle,) Star-bo-l-e-e-n-s, a-h-o-y! Eight bells there below! Tumble up!"
sender = dough_boy.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "Take the bucket, will ye, Ishmael?"
body = "Tish the buck!"
sender = queequeg.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "A history lesson"
body = "First: In the year 1820 the ship Essex, Captain Pollard, of Nantucket, was cruising in the Pacific Ocean. One day she saw spouts, lowered her boats, and gave chase to a shoal of sperm whales. Ere long, several of the whales were wounded; when, suddenly, a very large whale escaping from the boats, issued from the shoal, and bore directly down upon the ship. Dashing his forehead against her hull, he so stove her in, that in less than ten minutes she settled down and fell over. Not a surviving plank of her has been seen since. After the severest exposure, part of the crew reached the land in their boats. Being returned home at last, Captain Pollard once more sailed for the Pacific in command of another ship, but the gods shipwrecked him again upon unknown rocks and breakers; for the second time his ship was utterly lost, and forthwith forswearing the sea, he has never tempted it since. At this day Captain Pollard is a resident of Nantucket. I have seen Owen Chace, who was chief mate of the Essex at the time of the tragedy; I have read his plain and faithful narrative; I have conversed with his son; and all this within a few miles of the scene of the catastrophe"
sender = pip.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "The mat-maker"
body = "A sad business, Mr. Ishmael!"
sender = stubb.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)



subject = "There she blows! there! there! there! she blows! she blows!"
body = "There go flukes!"
sender = ahab.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject="What think ye of those boys, sir!"
body="Heave ho away, the whale is on the horizon."
sender = peleg.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject="A question for Queequeg"
body="Queequeg, said I, when they had dragged me, the last man, to the deck, and I was still shaking myself in my jacket to fling off the water; Queequeg, my fine friend, does this sort of thing often happen? Without much emotion, though soaked through just like me, he gave me to understand that such things did often happen."
sender = boomer.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject="What's up with that coffee-shop using my name-sake?"
body = "Coffee's pretty good though."
sender = starbuck.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "What's up with Ahab?"
body = "He seems to have a thing against me."
sender = whale.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "Soon"
body = "The white whale is near!"
sender = ahab.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "Swim away from me, will ye?"
body = "Ahoy there! This is the Pequod, bound round the world! Tell them to address all future letters to the Pacific ocean! and this time three years, if I am not at home, tell them to address them to—"
sender = ahab.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "Soup for lunch?"
body = "Clam chowder would be great"
sender = queequeg.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject = "My album is now out!"
body = "It's topped the ambient sea-mammal charts."
sender = whale.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "New expedition this winter"
body = "Care to join us Ishmael?"
sender = peleg.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "[MarketWatch] Whale oil reports to be released at market close"
body = "Visit MarketWatch for more information."
sender = market_watch.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


subject = "[Seamless] Take 15% off your first whale"
body = "Use Coupon ABC15JD on our website."
sender = seamless.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject = "[Seamless] Brr! It's cold out there. Have us bring you the whale"
body = "Visit our website for more offers and coupons."
sender = seamless.username
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


# 10.times do |i|
#   username = "terry#{i}"
#   password = "guest#{i}"
#   location = "United States of America"
#   gender = "M"
#   birthday= ["1987", "12", "1"]
#   fname = Faker::Name.first_name
#   lname = Faker::Name.last_name
#   user = User.create!(username: username, password: password, location: location,
#     gender: gender, birthday: birthday, fname: fname, lname: lname)
#
#     1.times do |j|
#       first_name = Faker::Name.first_name
      # rand_num = rand(1..100)
      # sender = "#{first_name}@gmail.com"
      # importance_set = rand(1..100) % 3 == 0 ? true : false
      # starred_set = rand(1..100) % 3 == 0 ? true : false
      # read_set = rand(1..100) % 3 == 0 ? true : false
#       user_id = 2
#       draft_set = false
#       parent_email_id = nil
#       if rand(1..100) % 2 === 0
#         parent_email_id = nil
#       else
#         parent_email_id = rand(1..100)
#       end
#       subject = Faker::Hipster.sentence
#       body = Faker::Hipster.paragraph(5)
#       Email.create!(sender: sender, user_id: user_id,
#       subject: subject, body: body, parent_email_id: parent_email_id, importance_set: importance_set, draft_set: draft_set, starred_set: starred_set, read_set: read_set
#       )
#     end
#     # Email.all.each do |email|
#     #   email.update(created_at: Faker::Time.between(5.days.ago, Time.now, :all))
#     # end
#
# end
#
# # terry = User.find(2)
#
# (2..10).each do |n|
#   Contact.create!(user_id: 2, contact_id: n)
# end


subject = "Welcome to Ishmail!"
body = "Welcome! Your email address is ishmael@ishmael.website.  Ishmael is a web application inspired by Gmail, built using Ruby on Rails and React.js. Ishmael aims to provide Gmail's core functionality in a minimalist build.  Thanks for dropping by, and be in touch!  You can reach me here or at terence.p.dignon@gmail.com."
user_id = ishmael.id
sender = terence.username
draft_set = false

Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set)

Email.where(parent_email_id: nil).each do |email|
  rand_num = rand(1..100)
  importance_set = rand(1..100) % 3 == 0 ? true : false
  starred_set = rand(1..100) % 3 == 0 ? true : false
  read_set = rand(1..100) % 3 == 0 ? true : false
  if email.sender != "terence_dignon"
    email.update(created_at: Faker::Time.between(2000.days.ago, Time.now, :all), importance_set: importance_set, starred_set: starred_set, read_set: read_set)
  end
end
