class EmailProcessor

  def self.process(email)
    Email.create!(user_id: 8, subject: email.subject, body: email.body, sender: email.from)
  end
end
