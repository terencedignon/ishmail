class EmailProcessor
  def initialize(email)
    @email = email
  end

  def process
    # all of your application-specific code here - creating models,
    # processing reports, etc
  
    # Here's an example of model creation
    raw_header = @email.raw_headers.gsub("\n", "<br>").html_safe
    raw_html = @email.raw_html.gsub("\n", "<br>").html_safe
    raw_text = @email.raw_text.gsub("\n", "<br>").html_safe

    [raw_text, raw_html, raw_header].each { |raw| raw.gsub!("\\", "")}


    @email.to.each do |recipient|
      parent_email_id = nil

      user = User.find_by_username(recipient[:token])
      if user
        if @email.subject.downcase.match(/re:/)
          subject = @email.subject.gsub("re:", "").gsub("RE:", "").strip

          email_id = Email.where(subject: "what up", user_id: user.id).order(created_at: :desc).first
          parent_email_id = email_id.id if email_id

        end
      end

      Email.create!(
        user_id: user.id,
        recipient: @email.to.map{|user| user[:full]}.join(", "),
        subject: @email.subject,
        email_updated_at: Time.new,
        body: @email.body,
        draft_set: false,
        parent_email_id: parent_email_id,
        raw_headers: raw_header,
        raw_html: raw_html,
        raw_text: raw_text,
        from_name: @email.from[:name],
        from_email: @email.from[:email]
        )
    end


    #
    # user = User.find_by_username(@email.to[0][:token])
    # Email.create!(
    #   user_id: user.id,
    #   recipient: @email.map{|user| user[:full]}.join(", ")
    #   subject: @email.subject,
    #   email_updated_at: Time.new,
    #   body: @email.body,
    #   draft_set: false,
    #   raw_headers: @email.raw_headers,
    #   raw_html: @email.raw_html,
    #   raw_text: @email.raw_text,
    #   from_name: @email.from[:name],
    #   from_email: @email.from[:email]
    #   )

    # user = User.find_by_email(@email.from[:email])
    # user.posts.create!(
    #   subject: @email.subject,
    #   body: @email.body
    # )
  end
end
