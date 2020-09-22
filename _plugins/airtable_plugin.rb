require 'dotenv/load'

require 'active_support/all'
require 'airtable'
require 'colorize'

@client = Airtable::Client.new(ENV['AIR_API_KEY'])
@table = @client.table(ENV['AIR_BASE_ID'], ENV['AIR_BASE_NAME'])
@records = @table.all
@column_name_mappings = {"Nombre" => "name", 
                         "Categoría" => "category", 
                         "Descripción" => "description",
                         "Número de teléfono" => "phone", 
                         "Link de contacto directo (red social)" => "social_media", 
                         "Logo de tu negocio en formato .PNG o .JPG" => "logo_link"}   

puts "#{@records.count} records pulled from Airtable."

File.open("_data/airtable.yml", "w") do |f|
  puts "Sanitizing records..."
  data = @records.map { |record| record.fields }.each do |record|
    record.keys.each { |k| record[ @column_name_mappings[k] ] = record.delete(k) if @column_name_mappings[k] || @column_name_mappings[k] }
  end
  puts "All records have been sanitized."
  f.write(data.to_yaml)
  puts "YAML database successfully created!"
end
