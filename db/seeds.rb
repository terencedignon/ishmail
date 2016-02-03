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
user = User.create!(username: username, password: password, location: location,
  gender: gender, birthday: birthday, fname: fname, lname: lname)


  username = "terrypdignon"
  password = "guest0"
  location = "United States of America"
  gender = "M"
  birthday= ["1987", "12", "1"]
  fname = Faker::Name.first_name
  lname = Faker::Name.last_name
  user = User.create!(username: username, password: password, location: location,
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

10.times do |i|
  username = "terry#{i}"
  password = "guest#{i}"
  location = "United States of America"
  gender = "M"
  birthday= ["1987", "12", "1"]
  fname = "Terry#{i}"
  lname = Faker::Name.last_name
  user = User.create!(username: username, password: password, location: location,
    gender: gender, birthday: birthday, fname: fname, lname: lname)

    200.times do |j|
      first_name = Faker::Name.first_name
      rand_num = rand(1..100)
      sender = "#{first_name}@gmail.com"
      importance_set = rand(1..100) % 3 == 0 ? true : false
      starred_set = rand(1..100) % 3 == 0 ? true : false
      read_set = rand(1..100) % 3 == 0 ? true : false
      user_id = 2
      draft_set = false
      parent_email_id = nil
      if rand(1..100) % 2 === 0
        parent_email_id = nil
      else
        parent_email_id = rand(1..100)
      end
      subject = Faker::Hipster.sentence
      body = Faker::Hipster.paragraph(5)
      Email.create!(sender: sender, user_id: user_id,
      subject: subject, body: body, parent_email_id: parent_email_id, importance_set: importance_set, draft_set: draft_set, starred_set: starred_set, read_set: read_set
      )
    end
    Email.all.each do |email|
      email.update(created_at: Faker::Time.between(5.days.ago, Time.now, :all))
    end

end

# terry = User.find(2)

# (2..10).each do |n|
#   Contact.create!(user_id: 1, contact_id: n)
# end
