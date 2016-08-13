/**
    资料来源:http://www.cnblogs.com/lanxuezaipiao/archive/2013/05/24/3096437.html

 在www.json.org上公布了很多JAVA下的json构造和解析工具，其中org.json和json-lib比较简单，两者使用上差不多但还是有些区别。
 下面接着介绍用org.json构造和解析Json数据的方法示例。

 用json-lib构造和解析Json数据的方法详解请参见我上一篇博文：Java构造和解析Json数据的两种方法详解一

 org.json包是另一个用来beans,collections,maps,java arrays 和XML和JSON互相转换的包，主要就是用来解析Json数据，
 在其官网http://www.json.org/上有详细讲解，有兴趣的可以去研究。


 由于org.json不能直接与bean进行转换，需要通过map进行中转，为了方便，我这里写了一个工具类JsonHelper，用于Json与Map、Bean的相互转换




 json-lib和org.json的使用几乎是相同的，我总结出的区别有两点：

 1. org.json比json-lib要轻量得多，前者没有依赖任何其他jar包，而后者要依赖ezmorph和commons的lang、logging、beanutils、collections等组件

 2. json-lib在构造bean和解析bean时比org.json要方便的多，json-lib可直接与bean互相转换，而org.json不能直接与bean相互转换而需要map作为中转，
 若将bean转为json数据，首先需要先将bean转换为map再将map转为json，比较麻烦。

 总之，还是那句话—适合自己的才是最好的，大家要按需选取使用哪种方法进行解析。
 最后给大家介绍两款解析Json数据的工具：一是在线工具JSON Edit（http://braincast.nl/samples/jsoneditor/）；
 另一个是Eclipse的插件JSON Tree Analyzer，都很好用，推荐给大家使用！

 */
package utils.Json_Map;