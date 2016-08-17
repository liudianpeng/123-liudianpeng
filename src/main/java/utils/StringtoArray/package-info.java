/**
 * Created by Peng on 2016/8/17.
 * 来源:http://blog.csdn.net/sanyuesan0000/article/details/7699342
 */
package utils.StringtoArray;
/**
 *
 * String 类：
 String 类代表字符串。Java 程序中的所有字符串字面值都作为此类的实例实现。字符串是常量，它们的值在创建之后不能更改。
 字符串缓冲区支持可变的字符串。因为 String 对象是不可变的，所以

 可以共享。
 String 类包括的方法可用于检查序列的单个字符、比较字符串、搜索字符串、提取子字符串、
 创建字符串副本并将所有字符全部转换为大写或小写。Java 语言提供对字符串串联符号（"+"）以及将其他

 对象转换为字符串的特殊支持。字符串串联是通过 StringBuilder（或 StringBuffer）类及其 append 方法实现的。
 字符串转换是通过 toString 方法实现的，该方法由 Object 类定义，并可被 Java

 中的所有类继承。
 String 类的split方法可以根据给定正则表达式的匹配拆分字符串，故而可以把字符串分离成单个字符的形式。
 StringTokenizer 类：
 string tokenizer 类允许应用程序将字符串分解为标记。tokenization 方法比 StreamTokenizer 类所使用的方法更简单。
 StringTokenizer 方法不区分标识符、数和带引号的字符串，它们也不识别并

 跳过注释。可以在创建时指定，也可以根据每个标记来指定分隔符（分隔标记的字符）集。
 StringTokenizer 的实例有两种行为方式，这取决于它在创建时使用的 returnDelims 标志的值是 true 还是 false：
 如果标志为 false，则分隔符字符用来分隔标记。标记是连续字符（不是分隔符）的最大序列。
 如果标志为 true，则认为那些分隔符字符本身即为标记。因此标记要么是一个分隔符字符，
 要么是那些连续字符（不是分隔符）的最大序列。
 StringTokenizer 对象在内部维护字符串中要被标记的当前位置。某些操作将此当前位置移至已处理的字符后。
 通过截取字符串的一个子串来返回标记，该字符串用于创建 StringTokenizer 对象。
 *
 *
 */