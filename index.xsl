<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:fn="http://www.w3.org/2005/xpath-functions"
	xmlns:xdt="http://www.w3.org/2005/xpath-datatypes"
	xmlns:err="http://www.w3.org/2005/xqt-errors"
	exclude-result-prefixes="xs xdt err fn">

	<xsl:output method="xml" indent="yes"/>
	
	<xsl:template match="/">
		
<html> 
    <head>
	    <title>Titolo</title>
    	<meta charset="UTF-8"/>
    	<link rel="stylesheet" href="stile.css"/>
    </head>
    <body>
        <ul>
    	    <xsl:for-each select="contenuti/contenuto">
    	        <li><xsl:value-of select="coordinateGPSlat"/></li>
                <li><xsl:value-of select="coordinateGPSlong"/></li>
                <xsl:for-each select="paroleChiave">
                    <li><xsl:value-of select="."/></li>
                </xsl:for-each>
                <xsl:for-each select="testoDescrittivo">
                    <li><xsl:value-of select="."/></li>
                </xsl:for-each>
                <xsl:for-each select="linkEsterno">
                    <li><xsl:value-of select="."/></li>
                </xsl:for-each>
            </xsl:for-each>
        </ul> 
    </body> 
</html> 
</xsl:template>
</xsl:stylesheet>
