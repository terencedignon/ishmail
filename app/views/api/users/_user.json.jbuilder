json.extract!(
  user, :username, :fname, :lname, :birthday,
    :location, :gender, :mobile_phone, :current_email,
    :vaca_response, :vaca_response_set, :show_snippets_set,
    :auto_complete_set, :importance_set, :signature, :pagination,
    :online, :id
)

json.contacts(user.contacts) do |contact|
  json.extract!(
    contact.subject, :username , :fname, :lname, :birthday,
      :location, :gender, :mobile_phone, :current_email,
      :vaca_response, :vaca_response_set, :show_snippets_set,
      :auto_complete_set, :importance_set, :signature, :pagination,
      :online, :id
  )
end
