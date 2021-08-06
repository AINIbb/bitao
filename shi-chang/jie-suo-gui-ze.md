# Unlock Rule

All ZGoat rewards obtained through AirDrop, Wishlist and Community Activities need to unlock by staking LP.

**1\)Unlock calculation formula:**

Unlock Speed = LP \* Time ^ 0.125 \*  K

Unlock MaxSpeed = Locked\_Num / 86400

Unlocked\_Num= Unlock Speed \* Time

{% hint style="info" %}
_LP_ refers to the amount of LP that users stake to unlock ZGoat; _Time_ refers to the amount of block in the period of staking LP; _K_ is a constant, that can be optimized according to market feedback.
{% endhint %}

![Unlocked\_Num Simulation](../.gitbook/assets/image%20%284%29.png)

As shown above, with Time increases, the amount of unlocked ZGoat will result in exponential growth. When unlock speed reachs Max speed, the amount of unlocked ZGoat will increase linearly.



**2）Unlock APY**

Unlock APY = Amount of Unlocked ZGoat / Value of Staking LP  \* （365 / Unlocked Spent Time）\* 100%

Simplified as below：

**APY =** Time ^ 0.125 \*  K1 \* 100%

{% hint style="info" %}
_K1_ is a constant, that can be optimized according to market feedback.
{% endhint %}

![Simulation Of Unlock APY](../.gitbook/assets/image%20%285%29.png)

Note that，because of the max speed, APY will reach the maximum with time going. For convenience of dashboard show, the maximum of Unlock AYP is calculated based on the amount of block within about a week, that is, MaxAPY = 4.6 \* K1 \* 100%



