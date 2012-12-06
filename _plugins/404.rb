# encoding: utf-8

module Jekyll

  class NotFoundIndex < Page    
    def initialize(site, base, dir)
      @site = site
      @base = base
      @dir = dir
      @name = '404.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), '404.html')
    end
  end

  class NotFoundGenerator < Generator
    safe true
    
    def generate(site)
      if site.layouts.key? '404'
        dir = ''
        write_404_page(site, dir)
      end
    end
  
    def write_404_page(site, dir)
      page = NotFoundIndex.new(site, site.source, dir)
      page.render(site.layouts, site.site_payload)
      page.write(site.source)
    end
  end

end