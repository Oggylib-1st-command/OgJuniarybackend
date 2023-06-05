# Generated by Django 4.2 on 2023-06-05 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_user_bookid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='bookid',
        ),
        migrations.AddField(
            model_name='user',
            name='bookid',
            field=models.ManyToManyField(blank=True, max_length=30, null=True, related_name='bookid', to='app.book', verbose_name='id_книги'),
        ),
    ]
