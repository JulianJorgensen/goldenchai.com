require 'httparty'
require 'json'

module Jekyll
  module CoverallCrew
    class CQTag < Liquid::Tag
      include HTTParty
      base_uri '50.17.28.249:4502'

      def initialize(tag_name, text, tokens)
        super
        @text = text
        @auth = {:username => 'admin', :password => 'aemcloudmanager42'}
      end

      def render(context)
        environment = context.registers[:site].config['env']

        cqURL = "/content/conference/summit-#{environment}/jcr:content/par/#{@text.strip}.json"

        options = {}
        options.merge!({:basic_auth => @auth})
        response = self.class.get(cqURL, options)

        #puts "body: #{response.body['text']}"
        #puts "code: #{response.code}" #200 is success
        #puts "message: #{response.message}" #OK is success
        #puts "inspect: #{response.headers.inspect}"

        puts ""

        if (response.code == 200) && (response.message == 'OK')
          puts "CQ-PLUGIN: replacing #{@text.strip} on #{environment}"
          reponse_hash = JSON.parse(response.body)
          reponse_hash['text']
        else
          puts "Error #{response.code} : #{response.message}"
          "Error for the #{@text} cq_get"
        end
      end
    end
  end
end

Liquid::Template.register_tag('cq_get', Jekyll::CoverallCrew::CQTag)