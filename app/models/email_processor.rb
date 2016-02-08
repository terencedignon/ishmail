class EmailProcessor
  def initialize(email)
    @email = email
  end
  def process
    email = @email
    Email.create!(user_id: 8, subject: email.subject, body: email.body, sender: email.from)
  end
end
