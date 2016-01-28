class Api::EmailsController < ApplicationController

  def index
    @emails = Email.get_by_current_user(current_user.id)
  end

  def show
    @email = Email.find(params[:id])
  end

  def update
    @email = Email.find(params[:id])
    @email.update(email_params)
    render :show
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
    params.require(:email).permit(:starred_set, :delete_set, :user_id, :sender, :body, :subject, :importance_set, :sent_set, :compose_set)
  end
end
