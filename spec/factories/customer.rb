FactoryGirl.define do
  factory :customer do
    company_name  { Faker::Company.name }
    contact_name  { Faker::Name.name }
    contact_email { Faker::Internet.email }
    contact_phone { Faker::PhoneNumber.phone_number }
    billing_email { Faker::Internet.email }
    billing_rate  { Faker::Number.number(4) }
    agency  { FactoryGirl.create(:agency) }
    # addresses { [FactoryGirl.create(:address)] }
  end
end
