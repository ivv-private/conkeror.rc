<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <xsl:output method="text"/>
  
  <xsl:template match="/">
    <xsl:apply-templates select='//xhtml:h1[@class="b-title"]'/>
    <xsl:apply-templates select="//xhtml:div[@class='b-translate']/*"/>
  </xsl:template>
  <xsl:template match="xhtml:h1">
    <xsl:value-of select="text()"/>
    <xsl:text>:  </xsl:text>
  </xsl:template>
  
  <xsl:template match="xhtml:a|xhtml:p[normalize-space(text()) != '']">
      <xsl:value-of select="normalize-space(translate(text(), ';,', ''))"/>
      <xsl:text>  |  </xsl:text>
      <xsl:apply-templates/>
  </xsl:template>
  
  <xsl:template match="text()"/>
</xsl:stylesheet>
