# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


50.times do
  sender = Faker::Internet.free_email
  user_id = 1
  subject = Faker::Hipster.sentences(1).join("  ")
  body = Faker::Hipster.sentences.join("  ")
  Email.create!(sender: sender, user_id: user_id, subject: subject, body: body)
end

50.times do |i|
  username = "guest#{i}"
  password = "guest#{i}"
  location = "United States of America"
  gender = "M"
  birthday= ["1987", "12", "1"]
  fname = "guest"
  lname = i.to_s
  User.create!(username: username, password: password, location: location,
    gender: gender, birthday: birthday, fname: fname, lname: lname)
end
