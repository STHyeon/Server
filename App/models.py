from django.db import models

class Post(models.Model):
    user = models.CharField(max_length=20)
    content = models.CharField(max_length=140, help_text="최대 140글자")
'''
class Tag(models.Model):
    #tag = models.ManyToManyField('Tag')
    name = models.CharField(max_length=140, unique=True)'''