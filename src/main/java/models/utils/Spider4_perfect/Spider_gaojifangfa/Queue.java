package models.utils.Spider4_perfect.Spider_gaojifangfa;

/**
 * Created by Peng on 2016/8/7.
 *自定义队列类 保存TODO表
 */
import java.util.LinkedList;
public class Queue {
    /**
     * 定义一个队列，使用LinkedList实现
     */
    private LinkedList<Object> queue = new LinkedList<Object>(); // 入队列
    /**
     * 将t加入到队列中
     */
    public void enQueue(Object t) {
        queue.addLast(t);
    }
    /**
     * 移除队列中的第一项并将其返回
     */
    public Object deQueue() {
        return queue.removeFirst();
    }
    /**
     * 返回队列是否为空
     */
    public boolean isQueueEmpty() {
        return queue.isEmpty();
    }
    /**
     * 判断并返回队列是否包含t
     */
    public boolean contians(Object t) {
        return queue.contains(t);
    }
    /**
     * 判断并返回队列是否为空
     */
    public boolean empty() {
        return queue.isEmpty();
    }
    /**
    还需要一个数据结构来记录已经访问过的 URL，即Visited表。
    考虑到这个表的作用，每当要访问一个 URL 的时候，首先在这个数据结构中进行查找，如果当前的 URL 已经存在，则丢弃这个URL任务。
    这个数据结构需要不重复并且能快速查找，所以选择HashSet来存储。
    综上，我们另建一个SpiderQueue类来保存Visited表和TODO表：
*/
}
