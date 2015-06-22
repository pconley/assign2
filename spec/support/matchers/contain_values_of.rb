RSpec::Matchers.define :contain_values_of do |expected|
  
  match do |actual|  
    # match if there is no delta
    delta(actual,expected).nil?
  end
  
  def delta(actual,expected)
    # puts "+++ actual = #{actual.inspect}"
    # puts "+++ expect = #{expected.inspect}"
    expected.keys.each do |key|
      actual_value = actual.with_indifferent_access[key]
      # puts "+++ checking key=#{key}  :  #{actual_value}=?=#{expected[key]}"
      return key if differ(actual_value,expected[key])
      # puts "+++ was equal"
    end
    return nil 
  end

  failure_message do |actual|
    bad_key = delta(actual,expected)
    "expected that #{actual} would contain the values of #{expected}; but #{bad_key} differed"
  end

  failure_message_when_negated do |actual|
    "expected that #{actual} would not contain the values of #{expected}"
  end

  description do
    "contain the values of #{expected}"
  end
  
  def differ(s1,s2)
    if is_integer(s1) && is_integer(s2)
      # compare as integer
      s1.to_i != s2.to_i
    else
      # compare as string
      s1.to_s != s2.to_s
    end
  end  
  
  def is_integer(s)
    return true if s =~ /\A\d+\Z/
    true if Integer(s) rescue false
  end  
  
end