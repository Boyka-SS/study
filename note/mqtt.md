对应知识点的使用问题可以查看官网每章节结尾的讨论：

[MQTT Essentials - All Core Concepts explained (hivemq.com)](https://www.hivemq.com/mqtt-essentials/)





MQTT是一款物联网信息传输最普遍的协议。该协议对物联网设备通过网络相互交流进行规则定义。MQTT协议用于物联网和物联网设备（如：嵌入式设备，传感器等）信息处理和数据交换。其基于事件驱动，并采用发布/订阅模式。数据发送者（publisher）和数据接收者（subscriber）通过`主题`交流，并相互解耦。二者的会话交由`MQTT broker(代理)`组织管理。MQTT broker 会对所有的收集信息分类，且正确地分发给subscriber

# MQTT Basics

## 一、Part1

### Introducing MQTT

接下来的10篇系列博客将会介绍MQTT协议的核心功能和基本概念。在本篇将会带你了解本系列博客的大体内容，让你快速了解MQTT，并且提供一些MQTT协议诞生的有趣的背景故事。

> HiveMQ4 目前支持MQTT5，官方高度推荐使用MQTT5。在其中引入很多功能，使其更健壮，更容易集成到现有的企业系统中。

一年之初，是为学习新事物的最佳时间。秉持这种精神，我们将在本系列博客中进一步涵盖更广泛的MQTT主题。从本系列文章开始到对安全性和客户端库的深入研究，会有更多内容向您走来。每周一将会发布一篇关于MQTT的博客。如果您对MQTT协议有兴趣，可以定期查看博客。但更好的是，成为我们网站的一员，直接获取最新的博客。

我们衷心希望这些博客可以快速帮助您，理解和实现MQTT。

在文尾，会有一段视频作为补充。推荐直接阅读博客，看视频来获取更多信息。

### Why,what and what not

在深入今天的主题前，先回答以下问题：本系列博客出现的原因，目标读者是谁，未来会涵盖的内容。Hive MQ	团队致力于MQTT很长一段时间，团队专家每天，无论是线上，还是线下，都会向客户回答诸如MQTT核心概念，订阅/发布，服务质量或者其他主题的问题。在本系列文章中，我们将为不同用户提供一个通俗易懂的指导，指导涵盖了MQTT的主要概念。MQTT协议是一个开放的协议，并且我们认为，有关如何使用它的信息也需要公开。

首先，系列文章将会对MQTT的基本概念（publish/subscribe，client/broker）和基本功能（Connect，Publish，Subscribe）进行介绍。接着，将介绍如下功能：Quality of Service ,Retained Messages, Persistent Session,Last Will and Testament,Keep alive and more。

### Introduction to MQTT

`MQTT是基于CS设计的，用于发布/订阅 消息的传输协议。具有轻量级，开放，简单，易实现的特点，因此，可用于多种条件受限的环境，如：M2M，IoT，网络带宽小`

正因为轻量，易实现，开销小的特点，使其与HTTP协议在有线网络上传输比，MQTT更加擅长。MQTT更加精彩的是其在客服端的简单易操作的特点。简单易操作一直会是其未来的关注点，并且 让其更加适合有限条件下的物理设备。

## 二、Part2

### Publish & Subscribe Basics

MQTT的`pub/sub`模式为传统CS结构提供了另一种可能。在CS结构中，客服端直接通过一个端口进行通信。而pub/sub模式对sender和receiver进行解耦。publisher和subscriber从不直接进行交流，甚至，彼此都不知道对方的存在。二者之间的会话由第三个模块（broker）管理。

![输入图片说明](https://foruda.gitee.com/images/1676780936480567757/2490ea84_8027319.png "Snipaste_2023-02-12_22-41-43.png")

pub/sub模式最重要的是对消息发布者与消息接收者进行分隔（解耦）。其含义如下：

- `空间解耦`：二者无需知道彼此的位置（ip,	port)
- `时间解耦`：二者无需同时运行
- `同步解耦`：publisher | broker | subscriber 三者操作互不打扰

【总结】：

pub/sub模式避免了publisher和subscriber的直接通信。broker的筛选功能可以让client接收到正确的消息。

### Scalability

MQTT的pub/sub模式要比传统的CS结构要更好的。原因在于broker上面的执行操作是可以并行的，并且，消息是基于事件驱动的。消息缓存和智能路由通常是提高可伸缩性的决定性因素。然而，当连接规模达到百万级将会是一个巨大的挑战。如此巨量的连接会通过broker集群实现（有单独的post涵盖）

### Message Filtering

MQTT broker 在pub/sub模式下，扮演了关键角色。但是，broker是如何正确将所有的消息分类并分发给正确的subscriber的呢？下面将会介绍几个过滤选项：

- OPTION 1：Subject-Based filtering

  这种过滤是基于每条消息内的`topic`或者`subject`(???)。接收端向broker订阅感兴趣的主题。自此，broker确保接收端会接收到所有关于订阅的主题的消息。总的来说，topics就是有层次结构的字符串，允许基于有限数量的表达式来过滤。

- OPTION 2：Content-Based filtering

  这种过滤方法是基于特定的`内容过滤语言`。接收端可以订阅自己感兴趣的相关消息。这种过滤方法的最大弊端在于必须提前知道消息内容，并且消息不可以被加密或者很容易被修改。

- OPTION 3：Type-Based filetering

  使用面向对象的语言编程时，过滤将基于一个消息的类或者种类，是一种普遍的做法。比如说：一个接收端将会监听所有的类型为Exception的消息，以及其子类型。

pub/sub并不是适用于所有的情况。在使用该模式前需要考虑一点事情。publisher 和 subscriber的解耦是该模式的关键，有一定的挑战。比如：需要提前知道被发布的消息是如何构成的？对于基于主题的过滤，双方还需要知道用哪个topics才可以得到正确的消息？另外需要注意的是，消息传递。publisher并不假使有人正在监听被发送的消息。在一些案例中，很有可能没有subscriber订阅某些消息。

### MQTT-What is it and What are its Key Features?

现在我们已经大体讲述了pub/sub模式，接下来将会专注于MQTT。可以根据下列提到的层面来实现你想要的：

- MQTT使得publisher和subscriber在空间上解耦。为了发布或接收消息，二者仅需要知道broker的IP地址即可
- MQTT在时间上也进行解耦。尽管大多mqtt使用案例都近乎实时地传递消息，但是如何想不这样，broker可以为不在线的client存储消息。（存储消息需要两个条件，同时实现才行：①client和broker之间的会话一直存在②client订阅的相关主题的Qs(quality of service)必须大于0）。
- mqtt异步工作。因为大多client异步工作，并且使用回调函数或者类似的模式，在等待数据或者发布消息时，自身的程序不会被堵塞。在一些特定案例中，同步是值得的。为了等待特定的消息，一些库存在同步APIS。但是broker的工作流通常是异步的。

另外值得一提的是，MQTT特别是在client端很容易实现。虽然大多pub/sub模式的系统都将业务逻辑放在broker端，但是在使用client library时，mqtt才是pub/sub模式的本质，也因此使其为资源受限的设备成为轻量级协议。

当使用基于主题来分类消息时，每个消息都有一个主题，broker借此决定是否将其分发给订阅者。在第五章，将会学习关于主题的概念。如果需要，你同样可以使用Hive MQ团队的MQTT broker来建立基于内容过滤的的系统。

为了处理pub/sub系统带来的挑战，MQTT有三种级别的Qs。可以轻松指定一个消息从client 发布到broker或从broker订阅到subscriber。但是，值得注意的是，会`存在没人订阅特定主题的情况`。如果这在你这成为一个问题，那么一定要让broker知道如何处理这种情况。比如，HiveMQ MQTT broker有一个插件系统可以处理该情况。你可以让broker采取应对措施，或者仅仅将消息打印到数据库以供后期分析使用。为了保持主题的层次结构具有一定的灵活性，小心的设计主题树结构并且预留一部分空间给未来的案例是很重要的。

### Distinction from message queues

MQTT 协议是否由消息队列实现，或者MQTT名词困惑都存在许多问题。下面介绍消息队列和MQTT的区别：

- 消息队列会**存储**消息，直到消息被消费，这与mqtt里没人订阅的消息一样，会被存在broker
- 一个消息仅仅会被一个client消费，而mqtt则是每个订阅相关主题的subscriber都可以得到message
- 消息队列静态的，创建好后才可以用上，而mqtt可以动态创建。

## 三、Part3

### Client,Broker and Connection Establishment

> 介绍mqtt client 和 broker 的作用，连接broker时候需要的参数和选项。并且解释MQTT server和会话建立

点击链接，查看官网提供的Java实现的案例[HiveMQ - Enterprise MQTT Broker (github.com)](https://github.com/hivemq)

下面在解释会话建立之前，先解释几个术语：

- **client**

  publisher和subscriber都可以是client。publisher 和subscriber 指的是无论client是在发布消息或者订阅接收消息（发布和订阅的功能可以在一个client实现）。一个mqtt client是任何一个运行MQTT库，并通过网络连接上broker的设备。MQTT协议的客户端实现非常简单和精简。通过[MQTT wiki]([libraries · mqtt/mqtt.org Wiki (github.com)](https://github.com/mqtt/mqtt.org/wiki/libraries))	查看mqtt支持的编程语言

- **broker**

  broker作为pub/sub模式的核心，主要负责接受所有的消息，消息分类，陈列消息订阅者，分发消息	。

  维护client与broker存在的持久会话，另外就是对client进行身份认证。可扩展，适配客户需求。

### MQTT CONNECTION

client和 broker都需要由TCP/IP协议栈。

![输入图片说明](https://foruda.gitee.com/images/1676780964509218076/301df087_8027319.png "QQ截图20230213221458.png")

会话只存在client 和 broker之间，client不可以直接通信。

首先，client会发送`CONNECT`消息向broker请求建立连接，然后broker会回应`CONNACK`消息和一个状态码。一旦会话建立，broker会一直维护直到client发送disconnect消息或者会话中断。

![输入图片说明](https://foruda.gitee.com/images/1676780975581368260/3ede49c8_8027319.png "QQ截图20230214121130.png")

### MQTT connection through a NAT

mqtt client可以使用内网IP通过NAT技术来连接broker

### Client initiates connection with the CONNECT message

在client与broker之间建立连接，client必须首先发送`connect`命令消息，但是如果是出于恶意的目的，broker会关闭连接。

connect message 需要参照下面内容设计：

![输入图片说明](https://foruda.gitee.com/images/1676780991476401075/6b4d3812_8027319.png "QQ截图20230214121912.png")

> 关于connect消息的细节请看[MQTT 3.1.1 specification]([MQTT Version 3.1.1 (oasis-open.org)](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html))

使用者无需关注太多，可以使用现有的MQTT library（这对库的实现者更有意思）。下面仅关注几个重点：

- ClientId

  broker借此区分不同的client以及他们的状态。id需要独一无二。在MQTT3.1.1中，如果无需broker维护状态可以不传clientid。clienid为空会导致连接无状态。这种情况，字段`clean session`需要设置为true，否则broker会拒绝连接

- Clean Session

  该字段会告诉broker本次连接是否想要建立持久连接。

  | cleansession | 含义                                                         |
  | ------------ | ------------------------------------------------------------ |
  | true         | 非持久连接，broker不会为client存储任何消息并且会清除之前的持久连接存下的数据 |
  | false        | 持久连接，broker会为client存储所有订阅和错过的消息（订阅的Qos级别为1或2） |

- Username/Password

  登录授权，推荐加密传输（SSL certificate）

- Will Message

  遗嘱消息是MQTT功能之一LWT的一部分。

  该消息会通知存在一个client意外中断了连接。当client连接时，其会以MQTT 消息的形式向broker提供遗嘱消息，同时将主题塞进connect message。在第九章会详细介绍

- KeepAlive

  指定当client和broker建立连接后，最长可以多久不联系（单位为秒）。

  client可以定期发送ping命令，broker做出相应的反应。这个方法可以让双方确定对方是否还在线。第10章就会详细展开。

### Broker response with a CONNACK message

当broker收到connect消息时，其有必要进行回应。

CONNACK包含以下两个数据实体：

- Session Present flag

  告诉client是否存在之前遗留的持久连接。

  如果 `clean session`为true，则session present flag一直为false；

  如果 `clean sesson`为false，则存在两种可能：

  - ​	clientid不为空，则为true
  - ​    clientid为空，则为false

  该字段可以帮助client决定是否需要订阅相关主题或者主题是否依旧存在持久连接里。

- Connect return code

  返回连接建立成功与否

 ![输入图片说明](https://foruda.gitee.com/images/1676781013100966930/3373e646_8027319.png "QQ截图20230214125328.png")
  
  返回值细节请看[MQTT specification]([MQTT Version 3.1.1 (oasis-open.org)](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718035))



## 四、Part4

### Publish，Subscribe & Unsubscribe

本章注意力将会放在MQTT的publish,subscribe,unsubscribe

### publish

对于连接上broker的client就可以发布消息。`每个被发布的消息必须有一个主题，这样mqtt会利用基于主题的过滤分类技术将消息转发给感兴趣的client`。通常，每个消息都有一个负载（payload），其内含有以字节形式传输的数据。

消息发布者发布的消息对broker来说是不可见的，client可以自己构建数据结构（类似结构体成员，可以自定义）。消息发布者可以决定发送数据的形式（二进制，文本，字符串）。

下面会对通常的 publish message里的参数进行细节描述：

![输入图片说明](https://foruda.gitee.com/images/1676781028912171539/1830ecdb_8027319.png "QQ截图20230217223509.png")

- `Packet Identifier`

  packetId是message在client和broker之间流转的唯一标识符。其只与Qos大于0的message生效（?）。

  client或者broker需要设置id值

- `Topic Name`

  主题名就是简单的以`/`作为分隔符的字符串（类似文件系统管理文件方式）。细节请看[part5 of MQTT Essentials]([MQTT Topics, Wildcards, & Best Practices - MQTT Essentials: Part 5 (hivemq.com)](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/))

- `Qos`

  Qos表示消息的服务质量的等级（0，1，2）。该数值决定消息传达的质量。细节请看[part 6 of MQTT Essential]([Quality of Service (QoS) 0,1, & 2 MQTT Essentials: Part 6 (hivemq.com)](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels/))

- `Retain Flag`

  表明broker是否对该消息特定的主题进行了最后值的保留。当新的client订阅该主题的时候，会得到该主题最后一条保存的值。细节请看[part 8 of MQTT Essentials]([Retained Messages - MQTT Essentials: Part 8 (hivemq.com)](https://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages/))

- `Payload`

  消息的实际数据。MQTT不能够查看数据。无论数据以什么格式传输。

- `DUP flag`

  表明消息进行了重发。需要Qos大于0的消息。通常重发机制由mqtt client实现或者broker也可以进行细节实现。细节请看[part 6 of MQTT Essentials]([Quality of Service (QoS) 0,1, & 2 MQTT Essentials: Part 6 (hivemq.com)](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels/))



当一个client为了发布消息而连接broker后，broker会读取消息携带的参数，并回应client告知已收到（是否回应看消息的Qos字段），然后处理消息。对消息的处理包括：决定将消息分发给订阅主题的subscriber。

 ![输入图片说明](https://foruda.gitee.com/images/1676781044613474302/38a824f2_8027319.png "QQ截图20230218200525.png")

最开始发布消息的client仅仅关注将`PUBLISH`消息发送给broker。而broker一旦接收到消息，其就会将消息分发给所有的subscriber。消息发布者不能够得知有多少消息订阅者，以及实际接收到数据的订阅者的数量。``

### Subscribe

如果没人订阅消息，那么发布消息将会毫无意义。对于感兴趣的主题，client可以对broker发送`SUBSCRIBE`消息。

SUBSCRIBE消息组成：`packetId+subscriptions`

![输入图片说明](https://foruda.gitee.com/images/1676781059219193289/23c5e384_8027319.png "QQ截图20230218201920.png")

- **Packet Identifier**

  同PUBLISH。

- **List of Subscriptions**

  一个client可以有多个订阅主题项。每一个主题项包含一个主题和一个Qos级别。主题可以由通配符组成，用来匹配一组模式的主题。对一个主题可能存在多个订阅项，broker则会分发Qos级别最高的一项。

### Suback

broker对subscriber中每一个subscription，总的返回一个`SUBACK`的确认消息。组成如下：

![输入图片说明](https://foruda.gitee.com/images/1676781075501663513/c53ce6af_8027319.png "QQ截图20230218204150.png")

- **packetId**

  独一无二，和SUBSCRIBE 消息一样的id

- **return code**

  为每一个subscription返回一个返回值。返回值对于每个订阅进行确认（通过或拒绝，都有对应的返回值表明），并表明Qos级别。

  | Return code | Return code Response  |
  | ----------- | --------------------- |
  | 0           | Success-Maximum QoS 0 |
  | 1           | Success-Maximum QoS 1 |
  | 2           | Success-Maximum QoS 2 |
  | 123         | Failure               |

![输入图片说明](https://foruda.gitee.com/images/1676781091667310695/b30d859e_8027319.png "QQ截图20230218204937.png")

一个client在成功发送`SUBSCRIBE`消息并接收到`SUBACK`后，他就会得到所有`能匹配SUBSCRIBE消息里的主题`的消息。

### Unsubscribe

用于删除一个client在broker上的订阅主题。组成和SUBSCRIBE消息一样：

![输入图片说明](https://foruda.gitee.com/images/1676781105855056649/78a0f1a6_8027319.png "QQ截图20230218205514.png")

- **packetId**

  同上

- **list of topic**

  client想要删除的主题，只需主题无需Qos。

### Unsuback

回应client的Ubsubscribe消息，仅含packetId一个参数 。

![输入图片说明](https://foruda.gitee.com/images/1676781136342242298/87eda965_8027319.png "QQ截图20230218215310.png")

client收到Unsuback会认为broker不会分发删除主题的消息给他。

## 五、Part5

### Topics & Best practices

>  **SYS-topics**是介绍broker信息的主题（细节百度搜索）

主题是UTF-8编码的字符串，用来分类消息。

一个主题由1个或者更多的主题级别构成，每个主题有一个`/`分隔

![输入图片说明](https://foruda.gitee.com/images/1676781152588144671/1f4eff45_8027319.png "topic_basics.png")

客服端不需要提前创建想要的主题，在发布或者订阅他们之前。代理允许任何预先未初始化的主题。

【例子】

```
myhome/groundfloor/livingroom/temperature
USA/California/San Francisco/Silicon Valley
5ff4a2ce-e485-40f4-826c-b1a5d81be9b6/status
Germany/Bavaria/car/2382340923453/latitude
```

> 每个主题至少有一个字符；并且允许空格；大小写敏感；单独一个`/`也是一个有效的主题

### MQTT Wildcards（类似正则表达式）

客服端既可以准确匹配主题，也可以使用通配符匹配一组主题；通配符`只能用于订阅消息，发布消息则被禁止`

#### Single level :+

`+`可以匹配单个级别的主题，单个主题不可以出现`+`

```
myhome/groundfloor/+/temperature

myhome/groundfloor/livingroom/temperature
myhome/groundfloor/kitchen/temperature
myhome/groundfloor/kitchen/brightness//error
myhome/firstfloor/kitchen/temperature//error
myhome/groundfloor/kitchen/fridge/temperature//error
```

#### Multi Level:#

`#` 约束主题前缀，放在最后一个级别，并且前面一个是`/`；无论主题层次多深，多长，只要前缀匹配即可被match

`/#`将接收所有主题的消息

```
myhome/groundfloor/#

myhome/groundfloor/livingroom/temperature
myhome/groundfloor/kitchen/temperature
myhome/groundfloor/kitchen/brightness
myhome/firstfloor/kitchen/temperature//error
```

#### MQTT Topics beginning with $

`$`开头的主题为MQTT broker 内置主题，消息发布时，不可以使用这些主题。具体请移步：[[MQTT GitHub wiki]](https://github.com/mqtt/mqtt.org/wiki/SYS-Topics)

### 建议

1. 禁止使用`/`作为主题的开头（诸如/myhome）

   /开头的主题是被禁止的。会在/引入0字符，会引发意想不到的bug，毫无意义

2. 在主题里面不要使用空格

   空格让主题难以debug；尽管语法允许，但是不代表可以使用

3. 主题短小精确

4. 尽可能使用ASCII字符，避免使用不可打印的字符

5. 在主题里面最好加上id或客服端id

6. 不要订阅#

7. 不要放弃扩展性

8. 尽可能使用准确的主题，而非笼统的

## 六、Part6

### Quality of Service  Levels

### Quality of Service (QoS) in MQTT

#### what is Quality of Service(Qos)?

Qos是消息发布者和消息订阅者双方达成的关于特定消息传输保证性的共识。

三种级别：

- At most once(0)
- At least once(1)
- Exactly once(2)

关于Qos需要从两个方面进行讨论：

- sender->broker
- broker->receiver

消息传输在二者之间存在些许差别。消息发布者在传递消息给broker时，会定义Qos字段。而broker向消息订阅者分发消息时候，会使用消息订阅者提供的Qos 。如果消息订阅者提供的Qos级别低于消息发布者的Qos，则会采用低级别的Qos

#### why is Qos important?

xxxx

#### How dose Qos work in MQTT?

- **Qos 0 - at most once**

   ![输入图片说明](https://foruda.gitee.com/images/1676781172922209289/4237cfeb_8027319.png "QQ截图20230218233740.png")

  最低级别0。尽最大努力传输数据，不可靠传输。receiver不会对数据接收进行确认，sender不会存储消息并且仅发送一次。提供了和底层TCP一样的保证性（？）

- **Qos 1 - at least once**

   ![输入图片说明](https://foruda.gitee.com/images/1676781183481368603/aaede72a_8027319.png "QQ截图20230218234031.png")

  消息`至少会发送一次`。sender会存储消息直到收到一个`PUBACK`消息。

  消息发送者会在PUBLISH和PUBACK之间进行匹配识别（packetId）。在恰当的时间过后，没有收到`PUBACK`消息，会进行重发。当receiver接收到一个Qos为1的消息会立马处理。

  ![输入图片说明](https://foruda.gitee.com/images/1676781193511676887/bab2759e_8027319.png "QQ截图20230218234927.png")

  消息发布者再次发布消息，会设置DUP flag字段。在Qos=1时，该字段仅处于内部使用目的，不会被broker和receiver处理。消息接收者照样会发送PUBACK消息。

  

- **Qos 2 - exactly once**

  保证消息`仅被特定消息接收者接收一次`。`最安全，最低效`的级别。一次保证，至少两次req/res（四次握手）。消息发送和接收通过packetid协作完成消息传输。

   ![输入图片说明](https://foruda.gitee.com/images/1676781206976118836/37261f76_8027319.png "QQ截图20230218235536.png")

  接收到Qos=2的消息，会相应处理消息。回复`PUBREC`消息。除非接收到PUBREC消息，否则，会持续发送带有DUP　ｆｌａｇ　的PUBLISH消息。

  收到PUBREC消息后，消息发送者会放弃发送的消息，并存储PUBREC消息，回应PUBREL消息。

  receiver收到PUBREL消息后，会回复PUBCOMP消息，并删除存储的状态信息。

  消息接收者在发送PUBCOMP消息后，才会存储一个引用，指向最初的PUBLISH消息。

  消息发送者收到PUBCOMP之后，publish消息才可以被二次使用。

  恰当时间后，消息发送者无论是client还是broker都会重发。消息接收者都要有相应的回复消息。

### 拓展：

- Ｑｏｓ降级？
- client　ｉｄ　独一无二

### Best practice

- Qos=0

  - sender 和 receiver 之间存在稳定或者完整的连接。

    连接测试client；前端app连接broker

  - 偶尔的数据丢失可以被接受

  - 无需待处理的数据排队

- Qos=1

  - 当前使用情况或者消息可以处理多份复制品？。`最常用的级别，因为至少保证数据到达一次，并且运行重发`
  - 不需要qos=2的开销

- Qos=2

  - 仅一次就可以接受所有消息。当重复传输会有害于系统用户或者消息订阅者。



> 当client有持久化连接时候，Qos=1,2的消息将会在broker排队，等待client处理

## 七、Part7

### Persistent Session and Queuing Messages

### Persistent Session

非持续化的连接，当意外连接中断，那么本次连接的topics会不存在，需要重新连接订阅。

重连重新订阅对有些设备来说吃不消。持久化连接会保存client相关信息在broker。[more details]([MQTT Client and Broker and MQTT Server and Connection Establishment Explained - MQTT Essentials: Part 3 (hivemq.com)](https://www.hivemq.com/blog/mqtt-essentials-part-3-client-broker-connection-establishment/))

### what's stored in a persistent session?

broker会为断线的client存储以下信息，当client恢复后，可以立刻获得相关信息：

- 会话是否依旧存在
- 订阅者列表
- client没有回复的Qos=1,2的消息
- 下线期间收到的所有Qos=1,2的消息
- 所有Qos=2的待回复确认的消息

### How do you start or end a persistent session?

当client和broker发送CONNECT消息时，可以携带`cleanSession`字段，来决定需要以下哪种类型的会话：

- cleanSession=true

  非持续化连接。意外连接断开，那么所有的上一次持久化连接所存储的消息和信息会被清空

- cleanSession=false

  持续化连接。所有信息和消息会被存储，直到client进行又一次cleanSession请求。对于已经建立会话的client，cleanSession=false可以让broker利用已经存在的会话将待处理的消息分发给client。

> 连接建立看part 3

### How dose the client know if a session is already stored?

在`CONNACK`消息里携带 *session present flag* ，表明先前建立的会话是否依旧存在于broker。

### Presistent session on the client side

建立持久化连接 client也需要存储一些信息：

- Qos=1,2的，等待被broker确认回复的消息
- Qos=2的，但未被broker回复的消息。

### Best practices

- presistent session

  即使下线也需要接收到特定主题的全部消息。broker可以尽可能分发消息，只要client一上线；

  client受限。希望broker可以帮忙存储消息订阅者的订阅消息，并可以快速恢复会话；

  client需要在重连后恢复所有Qos=1,2的消息

- clean session

  client仅是对特定主题进行发布消息，不订阅主题；

  client下线后没有获取消息的欲望

  

### how long does the broker store messages?

理论上broker可以存储会话直到client上线，但是由于OS的内存分配，可能会进行回收，具体看案例。

- 

## 八、Part8

> 消息发布者并`不确保消息订阅者可以实际接收到消息`。发布端唯一可以确保的是`将消息安全发送给broker`，这对消息订阅者同样适用。
>
> 消息订阅者`无法得知他们订阅的主题什么时间会有新的消息`，可能是几秒，几分钟，甚至几小时。消息订阅者对于订阅的主题的状态是一无所知的，直到一个新的匹配消息的发布。retained flag就是为了解决上述情况。

### Retained Messages

保留消息：retained	flag=true的普通消息。（类似缓存的一种存在）

broker存储的最后一条保留消息，以及对应主题的Qos。

消息订阅者使用通配符进行主题匹配时候，只要保留信息的主题匹配就可以立马得到。broker只为一个主题存储一个保留消息。

消息订阅者接收到的保留消息可以是非精准匹配主题的消息。

**保留消息可以帮助最近想要订阅的client获取主题状态。保留消息使得消息订阅者无需等待消息发布者发布消息**

保留消息可以不是最新的消息，但是最后一个retained flag=true的消息。`保留消息和持久化连接毛关系都没有`。

### Send a retained message

设置retained flag=true即可。

### Delete a retained message

发送一个带有0字节的payload，想要删除的主题的保留消息，即可删除broker上的特定主题的保留消息。

`新的保留消息会擦去旧的保留消息。`

### Why and when should you use Retained Message?

让消息订阅者无需等待即可获得message

## 九、Part9

mqtt诞生之初就是为了面对网络不稳定的场景。client的意外断线可能由连接中断，没电等其他原因引起。

对于知道client断联类型（分`是否发送DISCONNECT消息分类`），可以帮助开发者正确进行对策设计。

### Last Will and Testament

LWT会通知其他client关于意外失联的client相关信息。	对于连接broker的每一个client都需要定义一个遗嘱消息（topics，retained flag，Qos，payload）。broker会对遗嘱消息进行存储并检测意外中断的连接。意外中断出现时候，broker 会将遗嘱消息分发给消息订阅者。如果中断正常，broker则会抛弃存储的遗嘱消息

### How do you specify a LWT message for a client?

在connect消息里识别

### when  dose a broker send the LWT message?

- broker检测到IO错误或者网络连接失败时候
- client在确定时间里失联
- client在关闭连接时候，没有发送disconnect消息
- broker会主动关闭连接当协议出错时候

### Best practice

结合保留消息存储client 状态。

## 十、Part10

### Keep-alive & Client Take-over 

看文档吧，自己也没看懂