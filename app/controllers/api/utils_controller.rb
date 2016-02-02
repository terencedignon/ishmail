class Api::UtilsController < ApplicationController

  def search
    @search_results = PgSearch
     .multisearch(params[:query])
     .includes(:searchable, searchable: :emails)
     .page(params[:page])
     .limit(5)
 end

end
