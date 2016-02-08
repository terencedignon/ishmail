class Api::EmailsController < ApplicationController

  def index
    # if params["auto_update"]
      # @emails = Email.get_by_current_user(current_user.id).includes(:emails).where(parent_email_id: nil, created_at > params ).order(created_at: :desc).first(50)

    @emails = Email.get_by_current_user(current_user.id).includes(:emails, :recipients).where(parent_email_id: nil).order(email_updated_at: :desc).first(50)
  end

  def show
    @email = Email.find(params[:id])
  end

  def update
    recipient = nil
    recip_email = nil
    if params["email"]["sending_now"]
      recip_array = email_params["recipient"].split(",").join.split
      recip_array.each do |recip|
        debugger
        if recip.include?("@ishmael.website") || !recip.include?("@")
          username = email_params["recipient"].match(/[^\@]*/).to_s
          recipient = User.find_by_username(username)

          if recipient
            send_params = email_params.merge({"user_id" => recipient.id, "sender" => current_user.username, "sent_set" => false})
            recip_email = Email.create!(send_params)

            Contact.create(user_id: current_user.id, contact_id: recipient.id) unless
              current_user.contacts.map{ |contact| contact.subject}.include?(recipient)
          else
            @email = Email.find(params[:id])
            @email.update(email_params)

            send_params = email_params.merge({"user_id" => current_user.id, "sender" => User.find(1).username, "sent_set" => false,
              "parent_email_id" => params[:id], "read_set" => false, "body" => "Delivery to #{username} failed"})
            recip_email = Email.create!(send_params)
          end
        end
      end

    end

    @email = Email.find(params[:id])
    @email.update(email_params)
    render :show

  end

  def mass_destroy

    emails = params["email"]
    @emails = Email.where(id: emails)
    @emails.destroy_all

    # email_objects = []
    # emails.each do |id|
    #   email = Email.find(id)
    #   email.destroy if email
    # end
    render :index
  end

  def mass_update
    emails = params["email"]
    data = params["data"]
    key, value = params["data"].to_a.flatten
    return_array = []
    emails.each do |id|
      current_email = Email.find(id)
      current_email.update(key => value)
      return_array.push(current_email)
    end
    render json: return_array
  end

  def create
    @email = Email.new(email_params)
    @email.user_id = current_user.id
    @email.sender = current_user.username
    @email.save
    render :show
  end

  private
  def email_params
    params.require(:email).permit(:emails, :archive_set, :recipient, :starred_set, :delete_set, :spam_set, :user_id, :sender, :body, :subject, :importance_set, :draft_set, :read_set, :sent_set, :parent_email_id, :compose_set)
  end

  def user?(username)
    User.find_by_username(user)
  end

  def update_parent_email
    debugger
    current_email = self
    while current_email.parent_email_id
      current_email = Email.find(current_email.parent_email_id)
    end
    current_email.update!(email_updated_at: Time.new, read_set: false)
  end

end
