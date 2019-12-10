from django.db import models
#from django.contrib.auth.models import User

class Post(models.Model):
    user = models.CharField(max_length = 20)
    content = models.CharField(max_length=140, help_text="최대 140글자")

'''
class Tag(models.Model):
    user = models.ForeignKey(User)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)
    #tag = models.ManyToManyField('Tag')
    #image = models.ImageField()
    name = models.CharField(max_length=140, unique=True)
    @property
    def t_likes(self):
        return self.likes.count()
    '''