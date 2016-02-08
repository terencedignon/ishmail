class EmailProcessor
  def initialize(email)
    @email = email
  end

  def process
    # all of your application-specific code here - creating models,
    # processing reports, etc

    # Here's an example of model creation
    user = User.find_by_username(@email.to[0][:token])
    Email.create!(user_id: user.id, subject: @email.subject, email_updated_at: Time.new, body: @email.body, draft_set: false, sender: @email.from[:token])
    # user = User.find_by_email(@email.from[:email])
    # user.posts.create!(
    #   subject: @email.subject,
    #   body: @email.body
    # )
  end
end
