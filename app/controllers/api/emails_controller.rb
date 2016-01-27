class Api::EmailsController < ApplicationController

  def index
    @emails = Email.get_by_current_user(current_user.id)
  end

  def show
    @email = Email.find(params[:id])
  end
end
