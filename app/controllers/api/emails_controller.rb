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

  private
  def email_params
    params.require(:email).permit(:starred_set, :delete_set, :user_id, :sender, :body, :subject, :importance_set)
  end
end
