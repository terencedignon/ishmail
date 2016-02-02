json.total_count @search_results.total_count
json.results do
  json.array! @search_results do |result|
    result = result.searchable

    if result.class == Email
      json.partial!("api/emails/email", email: result)
    end
    json._type result.class.to_s
  end
end
