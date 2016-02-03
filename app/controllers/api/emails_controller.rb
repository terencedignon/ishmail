class Api::EmailsController < ApplicationController

  def index
    # if params["auto_update"]
      # @emails = Email.get_by_current_user(current_user.id).includes(:emails).where(parent_email_id: nil, created_at > params ).order(created_at: :desc).first(50)
    @emails = Email.get_by_current_user(current_user.id).includes(:emails).where(parent_email_id: nil).order(created_at: :desc).first(50)
  end

  def show
    @email = Email.find(params[:id])
  end

  def update
    @email = Email.find(params[:id])
    @email.update(email_params)
    render :show
  end

  def mass_destroy
    emails = params["email"]
    email_objects = []
    emails.each do |id|
      Email.find(id).destroy
    end
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
    @email.sender = "#{current_user.username}@ishmael.com"

    @email.save
    render :show
  end

  private
  def email_params
    params.require(:email).permit(:emails, :starred_set, :delete_set, :user_id, :sender, :body, :subject, :importance_set, :draft_set, :read_set, :sent_set, :compose_set)
  end
end
