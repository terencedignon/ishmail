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

username = "captain_ahab"
password = "guest0"
fname="Ahab"
lname=""

captain_ahab = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

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

username = "captain_bildad"
password="guest0"
fname="Bildad"
lname=""

captain_bildad = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

username="captain_peleg"
password="guest0"
fname="Peleg"
lname=""

captain_peleg = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

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

username="captain_boomer"
password="guest0"
fname="Dough"
lname="Boy"

captain_boomer = User.create(username: username, password: password, fname: fname, lname: lname, gender: gender, location: location, birthday: birthday)

###### create contacts

[captain_ahab, captain_boomer, landlord, dough_boy, pip, captain_peleg, captain_bildad, starbuck, stubb].each do |member|
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
sender = captain_peleg.username
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
sender = captain_bildad.username
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
sender = captain_ahab.username
draft_set = false

ahab_email = Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)

subject = "re: Am I a cannon-ball"
body = "I have never thought of you as a cannon-ball."
sender = ishmael.username
user_id = captain_ahab.id
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
user_id = captain_ahab.id
parent_email_id = stubb_email.id
Email.create!(subject: subject, body: body, user_id: user_id, sender: sender, draft_set: draft_set, parent_email_id: parent_email_id)


## message 9
subject = "The pipe."
body = "How now, this smoking no longer soothes. Oh, my pipe! hard must it go with me if thy charm be gone! Here have I been unconsciously toiling, not pleasuring—aye, and ignorantly smoking to windward all the while; to windward, and with such nervous whiffs, as if, like the dying whale, my final jets were the strongest and fullest of trouble. What business have I with this pipe? This thing that is meant for sereneness, to send up mild white vapours among mild white hairs, not among torn iron-grey locks like mine. I'll smoke no more—"
sender = captain_ahab.username
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
#       rand_num = rand(1..100)
#       sender = "#{first_name}@gmail.com"
#       importance_set = rand(1..100) % 3 == 0 ? true : false
#       starred_set = rand(1..100) % 3 == 0 ? true : false
#       read_set = rand(1..100) % 3 == 0 ? true : false
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
