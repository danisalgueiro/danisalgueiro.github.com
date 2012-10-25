# encoding: utf-8

module Jekyll

  class CategoryIndex < Page    
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category.html')
      self.data['category'] = category
      self.data['title'] = 'Categorías'
      self.data['subtitle'] = category
    end
  end

  class CategoryGenerator < Generator
    safe true
    
    def generate(site)
      if site.layouts.key? 'category'
        dir = 'category'
        site.categories.keys.each do |category|
          folder = category.downcase
          folder = folder.gsub(/\s+/, ' ')
          folder = folder.gsub(/\s+/, '-')
          folder = folder.gsub(/[áéíóúñ]/, 'á' => 'a', 'é' => 'e', 'í' => 'i', 'ó' => 'o', 'ú' => 'u', 'ñ' => 'n')
          write_category_index(site, File.join(dir, folder), category)
        end
      end
    end
  
    def write_category_index(site, dir, category)
      index = CategoryIndex.new(site, site.source, dir, category)
      index.render(site.layouts, site.site_payload)
      index.write(site.source)
      site.pages << index
    end
  end

end