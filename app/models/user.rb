class User < ActiveRecord::Base
  include PgSearch
  attr_reader :password

  validates :username, :fname, :lname, :password_digest, :birthday, :gender, :location, presence: true
  validates :password, confirmation: true, length: { minimum: 6, allow_nil: true }
  # validates :birth_day, inclusion: { in: 1..31 }
  # validates :birth_month, inclusion: { in: 1..12 }
  # validates :birth_year, inclusion: { in: 1900..2016 }
  validates :session_token, presence: true, uniqueness: true

  after_initialize :ensure_session_token

  # pg_search_scope :tasty_search, :associated_against => {
  #   :contacts => [:fname, :lname]
  # }

  multisearchable :against => [:fname, :lname, :username, :location]

  has_many :emails
  has_many :contacts
  # , through: :contacts, source: :contact_id

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil unless user && user.is_password?(password)
    user
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def birthday=(birthday)
    date = birthday.reverse.join("-")
    super(date)
    # xwrite_attribute(:birthday, date)
  end


  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  # def ensure_birthday
  #   date_string = [@birth_year, @birth_month, @birth_day].join("-")
  #   self.birthday = Date.parse(date_string)
  # end
end
