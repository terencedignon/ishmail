module ApplicationHelper
  def list_errors
    flash.now[:errors].join("<br>").html_safe if flash.now[:errors]
  end
end
