class Api::UtilsController < ApplicationController

  def search
    if params["type"] == "email"
      @search_results = PgSearch
       .multisearch(params[:query])
       .includes(searchable: :email, searchable: :emails)
       .page(params[:page])
       .limit(5)
    end
 end

end
